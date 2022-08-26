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

  let ventaBlue = await page.$eval(
    ".values > .venta > .val",
    (el) => el.textContent
    // (el) => el.innerHTML
  );

  // console.log(
  //   // "\nLast Updated: " +
  //   // actualizado.substr(42, 13).trim() +
  //   // "\nBlue Compra: " +
  //   // compraBlue +
  //   "\nBlue Venta: " +
  //   ventaBlue +
  //   "\n"
  // );

  // res.send(text);

  res.send(ventaBlue);

  await browser.close();
});

app.listen(process.env.PORT || 3000, () => {
  console.log("starting....");
});
