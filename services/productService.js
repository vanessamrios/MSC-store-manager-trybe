const productModel = require('../models/productModel');

const getAll = async () => {
    const products = await productModel.getAllProducts();
    return products;
  };

const getProductById = async (id) => {
    const product = await productModel.getProductById(id);
    return product;
};

const createProduct = async (name, quantity) => {
    const createdProduct = await productModel.createProduct(name, quantity);
    return createdProduct;
};

const existsProductByName = async (name) => productModel.existsProductByName(name);

const deleteProduct = async (id) => productModel.deleteProduct(id);

const updateProduct = async (product) => productModel.updateProduct(product);

module.exports = {
    getAll,
    getProductById,
    createProduct,
    existsProductByName,
    deleteProduct,
    updateProduct,
};