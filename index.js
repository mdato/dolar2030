const puppeteer = require("puppeteer");
const express = require("express");
const app = express();

app.get("/", async (req, res) => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto("http://www.dolar-blue.com/");


  // const text = await page.$eval("h1", (el) => el.textContent);

  let compraBlue = await page.$eval(
    ".values > .compra > .val",
    (el) => el.textContent
  );

  let ventaBlue = await page.$eval(
    ".values > .venta > .val",
    (el) => el.textContent
    // (el) => el.innerHTML
  );

  let actualizado = await page.$eval(
    ".update > .container",
    (el) => el.textContent
  );

  res.send("\nLast Updated: " +
    actualizado +
    " \nBlue Compra: " +
    compraBlue +
    " \nBlue Venta: " +
    ventaBlue +
    " \n")

  await browser.close();
});

app.listen(process.env.PORT || 3000, () => {
  console.log("starting....");
});
