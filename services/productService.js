const productModel = require('../models/productModel');

const getAll = async () => {
    const products = await productModel.getAllProducts();
    return products;
  };

const getProductById = async (id) => {
    const product = await productModel.getProductById(id);
    return product;
};

module.exports = {
    getAll,
    getProductById,
};