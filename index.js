const puppeteer = require('puppeteer');
const fs = require('fs/promises');

// Screenshot the webpage in view in the browser
async function screenshot() {
	// Code Here
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('https://learnwebcode.github.io/practice-requests/');
	await page.screenshot({ path: 'test.png' });
	await browser.close();
}

// Screenshot fullpage in browser
async function screenshot_fullpage() {
	// Code Here
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('https://en.wikipedia.org/wiki/JavaScript');
	await page.screenshot({ path: 'full_page.png', fullPage: true });
	await browser.close();
}

// Extract something from a webpage in browser
async function extract_name() {
	// Code Here
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('https://learnwebcode.github.io/practice-requests/');

	const names = ['red', 'blue', 'yellow'];
	await fs.writeFile('names.txt', names.join('\r\n'));

	await browser.close();
}

// screenshot();

// screenshot_fullpage();

extract_name();
