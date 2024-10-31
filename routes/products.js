const express = require('express');
const { handleCreateNewProducts, GetAllProducts } = require('../controllers/products');
const router = express.Router();
router.route("/").get(GetAllProducts).post(handleCreateNewProducts);

// app.get('/categories', async (req, res) => {
//   try {
//     const categories = await Category.find({});
//     res.status(200).send(categories);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });


module.exports = router;
