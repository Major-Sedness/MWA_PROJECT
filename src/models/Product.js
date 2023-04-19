const { error } = require('jquery');
const mongoose = require('mongoose');


const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;

