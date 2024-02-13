const puppeteer = require('puppeteer');

async function CreateBrowser() {
	const browser = await puppeteer.launch({ headless: false }); // Set headless: false to see the browser UI

	// Open a new page
	const page = await browser.newPage();

	const pages = await browser.pages();
	const firstPage = pages[0];
	await firstPage.close(); // This closes the first page

	return page;
}

async function Login(page, username, password) {
	// Set the HTTP authentication credentials before navigating to the page
	await page.authenticate({
		username: username, // replace with your username
		password: password, // replace with your password
	});

	// Navigate to the specified URL
	await page.goto('https://idservice.mau.se/', {
		waitUntil: 'networkidle2', // Waits for the network to be idle (no more than 2 network connections for at least 500 ms)
	});

	await page.click('a[title="Logga in"]');
}

async function SearchPerson(page, searchValue) {
	// Wait for the link to be loaded on the page
	await page.waitForSelector('a[title="Sök person"]');

	// Click on the link with title "Sök person"
	await page.click('a[title="Sök person"]');

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

module.exports = {
	CreateBrowser,
	Login,
	SearchPerson,
};
