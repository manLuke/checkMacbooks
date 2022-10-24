import { search } from "./modules/search";
import { check30days } from "./modules/check30days";
import { Item } from "./types/item";
const items: Item[] = require("./json/items");
const products = require("./json/sawProducts.json");
const puppeteer = require("puppeteer");

const url = "https://pc.bazos.cz/inzerat/158408944/macbook-air-13-m2-2022-cz-distribuce-zaruka-odpocet-dph.php";
const scrape = async () => {
  try {
    await check30days(products);
    const browser = await puppeteer.launch({ headless: true });
    const pages = await browser.pages();
    const page = pages[0];
    await page.setViewport({
      width: 1366,
      height: 768,
    });
    for (const item of items) {
      await search(browser, item);
    }
    browser.close();
  } catch (error) {
    console.log(error);
  }
};

scrape();
