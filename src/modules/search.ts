// this function fills the parameters into the search engine
// if there is any result for the search, then each result will be scraped in the ./scraping.ts function

import { Browser, Page } from "puppeteer";
import { Item } from "../types/item";
import scraping from "./scraping";
const pathsJson = require("../json/paths.json");
const paths = pathsJson[0];
const puppeteer = require("puppeteer");
export const search = async (browser: Browser, item: Item) => {
  try {
    const pages = await browser.pages();
    const page = pages[0];
    await page.goto("https://www.bazos.cz/");
    await page.type(paths.search, item.search);
    if (item.location) {
      await page.type(paths.location, item.location.toString());
    }
    if (item.around) {
      for (let i = 0; i < 3; i++) {
        await page.click(paths.around);
        await page.click(paths.around);
      }
      await page.keyboard.press("Backspace");
      await page.type(paths.around, item.around.toString());
    }
    if (item.priceMin) {
      await page.type(paths.priceMin, item.priceMin.toString());
    }
    if (item.priceMax) {
      await page.type(paths.priceMax, item.priceMax.toString());
    }
    await page.click(paths.searchButton);
    await page.waitForSelector(paths.searchButton);
    // check if there are any results
    const checkResult = await page.$(paths.results);
    if (!checkResult) {
      return;
    }
    const links = await page.$$eval(paths.results, (links: any) =>
      links.map((link: any) => link.href)
    );
    for (let link of links) {
      await scraping(browser, link, item);
    }
  } catch (error) {
    console.log(error);
  }
};
