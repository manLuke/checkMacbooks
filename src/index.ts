import scraping from "./modules/scraping";
import { check30days } from "./modules/check30days";
const products = require("./json/sawProducts.json");

const url = "https://pc.bazos.cz/inzerat/158408944/macbook-air-13-m2-2022-cz-distribuce-zaruka-odpocet-dph.php";
check30days(products);
scraping(url);