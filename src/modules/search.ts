import { Browser, Page } from "puppeteer";
import { Item } from "../types/item";
import scraping from "./scraping";
const pathsJson = require("../json/paths.json");
const paths = pathsJson[0];
const puppeteer = require("puppeteer");
export const search = async (page: Page, item: Item) => {
  try {
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
    await page.waitForSelector(paths.results);
    const links = await page.$$eval(paths.results, (links: any) =>
      links.map((link: any) => link.href)
    );

    links.forEach(async (link: string) => {
      await scraping(link, item);
    });
  } catch (error) {
    console.log(error);
  }
};
