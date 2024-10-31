const mongoose = require('mongoose');

// Define the image schema
const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
});

// Define the category schema
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
});

// Define the product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: [imageSchema], // Array of images
  description: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  colors: [String], // List of color options
  sizes: [String],  // List of size options
  stock: {
    type: Map,
    of: Number,  // Map to keep track of stock for each size
  },
  icons: {
    wishlist: Boolean,
    compare: Boolean,
    addToCart: Boolean,
    view: Boolean,
  },
});

const Category = mongoose.model('Category', categorySchema);
const Product = mongoose.model('Product', productSchema);

module.exports = { Product, Category };
