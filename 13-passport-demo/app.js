require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
//connecting to database
const connectDB = require('./db/connect')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const authMiddleware = (require = './middleware/authMiddleware')
const MongoDBStore = require('connect-mongodb-session')(session)
var store = new MongoDBStore({
	uri: process.env.MONGO_URI,
	collection: 'sessions',
})
//Catch errors
store.on('error', function (error) {
	console.log(error)
})

// setting up the LocalStrategy
passport.use(
	new LocalStrategy((username, password, done) => {
		User.findOne({ username: username })
			.then((user) => {
				if (!user) {
					return done(null, false, { message: 'Incorrect username' })
				}
				bcrypt.compare(password, user.password, (err, result) => {
					if (result) {
						return done(null, user)
					} else {
						return done(null, false, { message: 'Incorrect password' })
					}
				})
			})
			.catch((err) => {
				return done(err)
			})
	})
)
// To make sure our user is logged in, and to allow them to stay logged in as they move around our app, passport will use some data to create a cookie which is stored in the user’s browser.
passport.serializeUser(function (user, done) {
	done(null, user.id)
})

passport.deserializeUser(async function (id, done) {
	try {
		const user = await User.findById(id)
		done(null, user)
	} catch (err) {
		done(err)
	}
})

// app.set('views', __dirname)
app.set('view engine', 'ejs', authMiddleware)

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
	})
)
app.use(passport.initialize())
app.use(passport.session())
app.use(express.urlencoded({ extended: false }))
// app.use(function (req, res, next) {
// 	res.locals.currentUser = req.user
// 	next()
// })

//routes
app.get('/', (req, res) => {
	let messages = []
	if (req.session.messages) {
		messages = req.session.messages
		req.session.messages = []
	}
	res.render('index', { messages })
})
app.get('/sign-up', (req, res) => res.render('sign-up-form'))
app.post('/sign-up', async (req, res, next) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10)
		await User.create({ username: req.body.username, password: hashedPassword })
		res.redirect('/')
	} catch (err) {
		return next(err)
	}
})
app.post(
	'/log-in',
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/',
		failureMessage: true,
	})
)
app.get('/log-out', (req, res) => {
	req.session.destroy(function (err) {
		res.redirect('/')
	})
})
app.get('/restricted', authMiddleware, (req, res) => {
	if (!req.session.pageCount) {
		req.session.pageCount = 1
	} else {
		req.session.pageCount++
	}
	res.render('restricted', { pageCount: req.session.pageCount })
})

const port = 3000
const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI)

		app.listen(port, () =>
			console.log(`Server is listening on port ${port}...`)
		)
	} catch (error) {
		console.log(error)
	}
}

start()
