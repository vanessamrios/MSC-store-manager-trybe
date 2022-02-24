const saleModel = require('../models/saleModel');

const getAll = async () => {
    const sales = await saleModel.getAllSales();
    return sales;
  };

const getSaleById = async (id) => {
    const sale = await saleModel.getSaleById(id);
    return sale;
};

module.exports = {
    getAll,
    getSaleById,
};