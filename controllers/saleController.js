const saleService = require('../services/saleService');

const getAll = async (_req, res) => {
    const sales = await saleService.getAll();
    return res.status(200).json(sales);
};

const getSaleById = async (req, res) => {
    const { id } = req.params;
    const sale = await saleService.getSaleById(id);
    
    if (sale === null) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    
    return res.status(200).json(sale);
};

const createSale = async (req, res) => {
    const itemsSold = req.body;
    const createdSale = await saleService.createSale(itemsSold);
    return res.status(201).json(createdSale);
};

module.exports = {
  getAll,
  getSaleById,
  createSale,
};