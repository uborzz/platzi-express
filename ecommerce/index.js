const express = require("express");
const path = require("path")
const app = express();
const productsRouter = require("./routes/products");

// app.engine("jsx", expressJsx);  # por defecto usa pug
app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "pug");

app.get("/products", productsRouter);

const server = app.listen(8000, function () {
  console.log(`Listening http://localhost:${server.address().port}`);
});
