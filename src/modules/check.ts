// Check if the product has not already been registered and sent by email

import { Product } from '../types/products';
const products: Product[] = require('../json/sawProducts.json');

const fs = require('fs');
const puppeteer = require("puppeteer");

export const check = async (data: Product) => {
  try {
    if (!products.some(product => product.url === data.url)) {
      data.added = new Date().toLocaleDateString();
      products.push(data);
      await fs.writeFileSync(`${__dirname}/../json/sawProducts.json`, JSON.stringify(products))
    }
  } catch (error) {
    console.log(error);
  }
}