const puppeteer = require('puppeteer');
const fs = require('fs/promises');

// Screenshot the webpage in view in the browser
async function screenshot() {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('https://learnwebcode.github.io/practice-requests/');
	await page.screenshot({ path: 'test.png' });
	await browser.close();
}

// Screenshot fullpage in browser
async function screenshotFullpage() {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('https://en.wikipedia.org/wiki/JavaScript');
	await page.screenshot({ path: 'full_page.png', fullPage: true });
	await browser.close();
}

// Extract text from a webpage in browser
async function extractName() {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('https://learnwebcode.github.io/practice-requests/');

	// use evaluate to scan the webpage
	const names = await page.evaluate(() => {
		// write any clientside browser javascript code
		// scope is browser/chrome land NOT node.js land
		return Array.from(document.querySelectorAll('.info strong')).map(
			(x) => x.textContent
		);
	});
	await fs.writeFile('names.txt', names.join('\r\n'));

	await browser.close();
}

// Extract photos from a webpage in browser
async function extractPhotos() {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('https://learnwebcode.github.io/practice-requests/');

	// $$eval() = select multiple elements
	const photos = await page.$$eval('img', (imgs) => {
		return imgs.map((x) => x.src);
	});

	for (const photo of photos) {
		const imagePage = await page.goto(photo);
		// split the url at the last / and use the last poriton which is the image name
		await fs.writeFile(photo.split('/').pop(), await imagePage.buffer());
	}

	await browser.close();
}

// Extract photos from a webpage in browser
async function extractClickedData() {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('https://learnwebcode.github.io/practice-requests/');

	// use page.click({id}) to click a button on the page
	await page.click('#clickme');
	const clickedData = await page.$eval('#data', (el) => el.textContent);
	// Print data to the console
	console.log(clickedData);

	await browser.close();
}

// screenshot();

// screenshotFullpage();

// extractName();

// extractPhotos();

extractClickedData();
