// removes products that have been in the database for more than a month

import fs from 'fs';
import { Product } from '../types/products';

export const check30days = async (products: Product[]) => {
  try {
    products.forEach(async product => {
      if (product.added) {
        const difference = new Date().getTime() - new Date(product.added).getTime();
        const days = difference / (1000 * 3600 * 24);
        if (days > 30) {
          const index = products.indexOf(product);
          products.splice(index, 1);
          return await fs.writeFileSync(`${__dirname}/../json/sawProducts.json`, JSON.stringify(products))
        }
      }
    })
  } catch (error) {
    console.log(error);
  }
}