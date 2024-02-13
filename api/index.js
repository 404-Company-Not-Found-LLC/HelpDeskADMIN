// IMPORTS
const dotenv = require('dotenv');
const express = require('express');
// IMPORT OF FUNCTIONS
const functions = require('./functions');

// CONFIGURATION
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;

/*
  DOTENV CONTENTS:
  ----------------
  UNAME=username 
  PWORD=password
  TESTING=true/false
  PORT=3000
*/

// ENDPOINTS
app.post('/', async (req, res) => {
	const page = await functions.CreateBrowser();

	let username;
	let password;

	if (process.env.TESTING === 'true') {
		username = process.env.UNAME;
		password = process.env.PWORD;
	} else {
		console.log('false section');
		username = req.body.username;
		password = req.body.password;
	}

	const searchValue = req.body.searchValue;

	await functions.Login(page, username, password);
	await functions.SearchPerson(page, searchValue);

	res.send('Hello World!');
});

app.post('/test', async (req, res) => {
	console.log(process.env.TESTING);
	let username;
	let password;
	if (process.env.TESTING === 'true') {
		username = process.env.UNAME;
		password = process.env.PWORD;
	} else {
		console.log('false section');
		username = req.body.username;
		password = req.body.password;
	}

	const searchValue = req.body.searchValue;

	res.send({
		username: username,
		password: password,
		searchValue: searchValue,
	});
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
