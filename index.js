const puppeteer = require('puppeteer');
const readline = require('readline');

// Create a readline interface
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

// A function to prompt for input
function askQuestion(query) {
	return new Promise((resolve) => {
		rl.question(query, (answer) => {
			resolve(answer);
		});
	});
}

async function CreateBrowser() {
	const browser = await puppeteer.launch({ headless: false }); // Set headless: false to see the browser UI

	// Open a new page
	const page = await browser.newPage();

	const pages = await browser.pages();
	const firstPage = pages[0];
	await firstPage.close(); // This closes the first page

	return page;
}

async function Login(page) {
	// Set the HTTP authentication credentials before navigating to the page
	await page.authenticate({
		username: '', // replace with your username
		password: '', // replace with your password
	});

	// Navigate to the specified URL
	await page.goto('https://idservice.mau.se/', {
		waitUntil: 'networkidle2', // Waits for the network to be idle (no more than 2 network connections for at least 500 ms)
	});

	await page.click('a[title="Logga in"]');
}

async function SearchPerson(page) {
	// Wait for the link to be loaded on the page
	await page.waitForSelector('a[title="Sök person"]');

	// Click on the link with title "Sök person"
	await page.click('a[title="Sök person"]');

	// Ask for the computer-id
	const searchValue = await askQuestion('Enter computer-id: ');

	// Fill in the search field with the searchValue
	await page.type('#frontpagePlc_tbxSearchString', searchValue);

	// Click the search button
	await page.click('#frontpagePlc_btnSearch');

	// Check if the image exists on the page
	const image = await page.$(
		'#ctl00_frontpagePlc_listViewSearch_ctrl0_imgIsADUser'
	);

	if (image) {
		console.log('The image exists.');
	} else {
		console.log('The image does not exist.');
	}
}

async function main() {
	const page = await CreateBrowser();
	await Login(page);
	await SearchPerson(page);
}

main();
