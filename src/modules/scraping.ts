// this function saves the data about the given product and calls the ./check.ts function

import { Browser, Page } from "puppeteer";
import { Item } from "../types/item";
import { check } from "./check";
import { daysDifference } from "./daysDifference";

const puppeteer = require("puppeteer");
const pahtsJson = require("../json/paths.json");
const paths = pahtsJson[1];

const scraping = async (browser: Browser, url: string, item: Item) => {
  try {
    const page = await browser.newPage();
    await page.goto(url);
    const title = await page.$eval(paths.title, (el: any) => el.textContent);
    const description = await page.$eval(
      paths.description,
      (el: any) => el.textContent
    );
    const price = await page.$eval(paths.price, (el: any) => el.textContent);
    const image_url = await page.$eval(paths.image_url, (el: any) => el.src);

    let date = await page.$eval(paths.date, (el: any) => el.textContent);
    let top = date.includes("TOP");

    // get date from scraped date string
    date = date.split('').slice(date.indexOf('[')+1, date.indexOf(']'));
    date.splice(date.indexOf(" "), 1);
    date = date.join('').split('.').reverse();
    date = new Date(date).toLocaleDateString();
    const days = daysDifference(new Date(), new Date(date));
    const data = { url, title, description, price, date, top, search: item.search, image_url};
    // check if the product has been published in the given number of days
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
