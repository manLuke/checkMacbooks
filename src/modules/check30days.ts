// removes products that have been in the database for more than a month

import fs from 'fs';
import { Product } from '../types/products';
import { daysDifference } from './daysDifference';

export const check30days = async (products: Product[]) => {
  try {
    products.forEach(async product => {
      if (product.added) {
        const days = daysDifference(new Date(), new Date(product.added));
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