import { Page } from "puppeteer";
import { Item } from "../types/item";
import { check } from "./check";
import { daysDifference } from "./daysDifference";

const puppeteer = require("puppeteer");
const pahtsJson = require("../json/paths.json");
const paths = pahtsJson[1];

const scraping = async (url: string, item: Item) => {
  try {
    const browser = await puppeteer.launch({ headless: true });
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
    let date = await page.$eval(paths.date, (el: any) => el.textContent);
    let top = date.includes("TOP");
    date = date.split('').slice(date.indexOf('[')+1, date.indexOf(']'));
    date.splice(date.indexOf(" "), 1);
    date = date.join('').split('.').reverse();
    date = new Date(date);
    const days = daysDifference(new Date(), date);
    const data = { url, title, description, price, date: date, top };
    await browser.close();
    if (item.days) {
      if (days >= item.days ) {
        return;
      }
    }
    await check(data);
  } catch (error) {
    console.log(error);
  }
};

export default scraping;
