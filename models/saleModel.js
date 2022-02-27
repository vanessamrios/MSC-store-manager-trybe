const connection = require('./connection');

const getAllSales = async () => {
    const query = `
        SELECT 
            sales.id AS saleId,
            sales.date,
            product.product_id AS productId,
            product.quantity
        FROM
            StoreManager.sales 
        INNER JOIN
            StoreManager.sales_products AS product
                ON sales.id = product.sale_id;
    `;

    const [sales] = await connection.execute(query);
    return sales;
};

const getSaleById = async (id) => {
    if (!id) {
        return null;
    }
    const query = `
        SELECT 
            sales.date,
            product.product_id AS productId,
            product.quantity
        FROM
            StoreManager.sales 
        INNER JOIN
            StoreManager.sales_products AS product
                ON sales.id = product.sale_id
        WHERE sales.id = ?;
    `;

    const [sale] = await connection.execute(query, [id]);
    if (!sale.length) return null;
    
    return sale;
};

const createSale = async () => {
    const querySales = 'INSERT INTO StoreManager.sales (date) VALUES (NOW());';
    const [sale] = await connection.execute(querySales);
    const saleId = sale.insertId;
    return saleId;
};

const addProductToSale = async (saleId, productId, quantity) => {
    const querySalesProduct = `
    INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);
    `;
    await connection.execute(querySalesProduct, [saleId, productId, quantity]);
    const addedProduct = {
        productId,
        quantity,
    };
    return addedProduct;
};

const updateSale = async (saleId, productId, quantity) => {
    const query = `
    UPDATE StoreManager.sales_products
    SET
        product_id = ?,
        quantity = ?
    WHERE
        sale_id = ? ;
    `;
    const [result] = await connection.execute(query, [productId, quantity, saleId]);
        
    if (!result.affectedRows) {
        return null;
    }
    const itemUpdated = {
        productId,
        quantity,
    };
    return itemUpdated;
};

module.exports = {
    getAllSales,
    getSaleById,
    createSale,
    addProductToSale,
    updateSale,
};