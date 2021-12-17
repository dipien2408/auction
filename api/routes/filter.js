const Product = require("../models/Product");
const router = require("express").Router();

router.get("/search/", async (req, res) => {
    const qResult = req.query.result;
    try {
      let products;
      products = await Product.find({title: qResult});
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;