const { writeFileSync } = require('fs');

const makeFile = async () => {
	try {
		await writeFileSync('./content/practice2.txt', 'This is the first line.\n');
		for (let i = 2; i < 11; i++) {
			await writeFileSync('./content/practice2.txt', `This is line ${i}.\n`, {
				flag: 'a',
			});
		}
	} catch (err) {
		console.log(err);
	}
};

makeFile();