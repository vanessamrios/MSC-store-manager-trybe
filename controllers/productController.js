const productService = require('../services/productService');

const getAll = async (_req, res) => {
    const products = await productService.getAll();
    return res.status(200).json(products);
};

const getProductById = async (req, res) => {
    const { id } = req.params;
    const product = await productService.getProductById(id);
    
    if (product === null) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    return res.status(200).json(product);
};

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;

  if (await productService.existsProductByName(name)) {
    return res.status(409).json({ message: 'Product already exists' });
  }

  const createdProduct = await productService.createProduct(name, quantity);
  return res.status(201).json(createdProduct);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const result = await productService.deleteProduct(id);
  if (!result) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.status(204).end();
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const product = {
    id,
    name,
    quantity,
  };

  const updatedProduct = await productService.updateProduct(product);
  if (!updatedProduct) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.status(200).json(updatedProduct);
};

module.exports = {
  getAll,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
};