import { search } from "./modules/search";
import { check30days } from "./modules/check30days";
import { Item } from "./types/item";
const items: Item[] = require("./json/items");
const products = require("./json/sawProducts.json");
const puppeteer = require("puppeteer");
const schedule = require("node-schedule");

const scrape = async () => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const pages = await browser.pages();
    const page = pages[0];
    await page.setViewport({
      width: 1366,
      height: 768,
    });
    for (let item of items) {
      await search(browser, item);
    }
    browser.close();
  } catch (error) {
    console.log(error);
  }
};

schedule.scheduleJob("40 11 * * *", async () => {
  // These function will run every day at 11:40 am
  await check30days(products);
  await scrape();
  
  // log time for measuring speed
  // console.log(new Date().toString());
});