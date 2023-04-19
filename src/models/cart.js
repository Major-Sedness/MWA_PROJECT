const { error } = require('jquery');
const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const userss = mongoose.model('user', productSchema);
module.exports = userss;

