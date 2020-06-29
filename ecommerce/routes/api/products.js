const express = require("express");
const router = express.Router();
const ProductsService = require("../../services/products");

const productService = new ProductsService();

router.get("/", async function (req, res, next) {
  const { tags } = req.query;

  try {
    const products = await productService.getProducts({ tags: tags });

    res.status(200).json({
      data: products,
      message: "products listed",
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:productId", async function (req, res, next) {
  const { productId } = req.params;

  try {
    const product = await productService.getProduct({ productId });

    res.status(200).json({
      data: product,
      message: "product listed",
    });
  } catch (err) {
    next(err);
  }
});

router.post("/", async function (req, res, next) {
  const { body: product } = req; // alias
  console.log("REQ")
  console.log(req)

  try {
    const createdProductId = await productService.createProduct({ product });

    res.status(201).json({
      data: createdProductId,
      message: "product listed",
    });
  } catch (err) {
    next(err);
  }
});

router.put("/:productId", async function (req, res, next) {
  const { productId } = req.params;
  const { body: product } = req;

  try {
    const updatedProduct = await productService.updateProduct({ productId, product });
    res.status(200).json({
      data: updatedProduct,
      message: "product updated",
    });
  } catch (err) {
    next(err);
  }
});


// router.patch("/:productId", async function (req, res, next) {
//   const { productId } = req.params;
//   const { body: changes } = req;

//   try {
//     const modifiedProduct = productService.modifyProduct({ productId, changes });
//     res.status(200).json({
//       data: modifiedProduct,
//       message: "product modified",
//     });
//   } catch (err) {
//     next(err);
//   }
// });

router.delete("/:productId", async function (req, res, next) {
  const { productId } = req.params;

  try {
    const deletedProductId = await productService.deleteProduct({ productId });

    res.status(200).json({
      data: deletedProductId,
      message: "product deleted",
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
