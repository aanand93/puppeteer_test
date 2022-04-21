const puppeteer = require('puppeteer');
const fs = require('fs/promises');

// Run the function below and a .txt file will be created labeled with the date you run the scraper on. Inside the file all the urls for the new items will be listed.

async function extractHref() {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('https://www.supremenewyork.com/shop/new/');

	// $$eval() = select multiple elements
	const hrefs = await page.$$eval('.inner-article a', (links) => {
		return links.map((x) => x.href);
	});

	// Create todays date for filename
	let today = new Date();
	let dd = String(today.getDate()).padStart(2, '0');
	let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	let yyyy = today.getFullYear();

	today = mm + '_' + dd + '_' + yyyy;

	for (const href of hrefs) {
		const hrefPage = await page.goto(href);
		// split the url at the last / and use the last poriton which is the image name
		await fs.writeFile(`New_Supreme_Items_${today}.txt`, hrefs.join('\r\n'));
	}

	await browser.close();
}

extractHref();

/* ------------------------------------------------*/
/*-------------------Automation--------------------*/
/* ------------------------------------------------*/

// Run function Once A Day
// setInterval(extractHref, 86400000);
