const puppeteer = require('puppeteer');
const fs = require('fs/promises');

// Run the function below and a .txt file will be created labeled with the date you run the scraper on. Inside the file all the urls for the new items will be listed.

async function extractHref() {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('https://www.nike.com/w/new-3n82y/');

	// $$eval() = select multiple elements, in this case link tags inside the product class
	const hrefs = await page.$$eval('.product-card a', (links) => {
		return links.map((x) => x.href);
	});

	// Create todays date for the filename
	let today = new Date();
	let dd = String(today.getDate()).padStart(2, '0');
	let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	let yyyy = today.getFullYear();

	today = mm + '_' + dd + '_' + yyyy;

	for (const href of hrefs) {
		const hrefPage = await page.goto(href);
		// Create a new file with the date the scraper was ran, post all the scraped info in list form.
		await fs.writeFile(`New_Nike_Items_${today}.txt`, hrefs.join('\r\n'));
	}

	await browser.close();
}

extractHref();
