const saleModel = require('../models/saleModel');

const getAll = async () => {
    const sales = await saleModel.getAllSales();
    return sales;
  };

const getSaleById = async (id) => {
    const sale = await saleModel.getSaleById(id);
    return sale;
};

const createSale = async (itemsSold) => {
    const saleId = await saleModel.createSale();
    const items = await Promise.all(
        itemsSold.map(async (i) => saleModel.addProductToSale(saleId, i.productId, i.quantity)),
    );

    const createdSale = {
        id: saleId,
        itemsSold: items,
    };

    return createdSale;
};

module.exports = {
    getAll,
    getSaleById,
    createSale,
};