const mongoose = require('mongoose');
const { Product } = require('../models/products');


// Create a new products
async function handleCreateNewProducts(req, res) {
    const { name, price, images, description, category, colors, sizes, stock, icons } = req.body;
    try {
      const newProduct = new Product({
        name,
        price,
        images,
        description,
        category,
        colors,
        sizes,
        stock,
        icons,
      });
      await newProduct.save();
      res.status(201).send(newProduct);
    } catch (err) {
      res.status(400).send(err);
    }
}

async function GetAllProducts(req, res) {
  try {
      const products = await Product.find({}).populate('category');
      res.status(200).send(products);
  } catch (err) {
      console.error('Error fetching products:', err);
      res.status(500).send({ message: 'Error fetching products', error: err });
  }
}

module.exports = {
    handleCreateNewProducts,
    GetAllProducts,
};
