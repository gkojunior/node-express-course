const os = require('os');
const { writeFileSync } = require('fs');

const sentence = require('./practice2');
const user = os.userInfo().username;

writeFileSync('./content/practice.txt', `${sentence}${user}.`, (err, res) => {
	if (err) {
		console.log(err);
		return;
	}
});
