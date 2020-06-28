
const express = require('express');
const router = express.Router();

const products = [
    {name: 'Mouse', price: 24},
    {name: 'Keyboard', price: 45}
]

router.use("/", function (req, res) {
    // res.send({ products });
    res.render("products", { products });
});

module.exports = router;