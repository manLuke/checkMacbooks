import { Page } from "puppeteer";
import { check } from "./check";

const puppeteer = require("puppeteer");
const pahtsJson = require("../json/paths.json");
const paths = pahtsJson[1];

const scraping = async (url: string) => {
  try {
    const browser = await puppeteer.launch();
    const pages: Page[] = await browser.pages();
    const page: Page = pages[0];
    await page.setViewport({
      width: 1366,
      height: 768,
    });
    await page.goto(url);
    const title = await page.$eval(paths.title, (el: any) => el.textContent);
    const description = await page.$eval(
      paths.description,
      (el: any) => el.textContent
    );
    const price = await page.$eval(paths.price, (el: any) => el.textContent);
    const data = { url, title, description, price };
    await browser.close();
    check(data);
  } catch (error) {
    console.log(error);
  }
};

export default scraping;
