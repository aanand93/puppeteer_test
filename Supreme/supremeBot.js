const puppeteer = require('puppeteer');
const fs = require('fs/promises');

async function extractHref() {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('https://www.supremenewyork.com/shop/new/');

	// $$eval() = select multiple elements
	const hrefs = await page.$$eval('.inner-article a', (links) => {
		return links.map((x) => x.href);
	});

	let today = new Date();
	let dd = String(today.getDate()).padStart(2, '0');
	let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	let yyyy = today.getFullYear();

	today = mm + '_' + dd + '_' + yyyy;
	// document.write(today);

	for (const href of hrefs) {
		const hrefPage = await page.goto(href);
		// split the url at the last / and use the last poriton which is the image name
		await fs.writeFile(`New_Supreme_Items_${today}.txt`, hrefs.join('\r\n'));
	}

	await browser.close();
}

extractHref();
