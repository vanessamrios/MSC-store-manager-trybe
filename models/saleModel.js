const connection = require('./connection');

const getAllSales = async () => {
    const query = `
        SELECT 
            sales.id AS saleId,
            sales.date,
            product.product_id AS productId,
            product.quantity
        FROM
            sales 
        INNER JOIN
            sales_products AS product
                ON sales.id = product.sale_id;
    `;

    const [sales] = await connection.execute(query);
    return sales;
};

const getSaleById = async (id) => {
    const query = `
        SELECT 
            sales.date,
            product.product_id AS productId,
            product.quantity
        FROM
            sales 
        INNER JOIN
            sales_products AS product
                ON sales.id = product.sale_id
        WHERE sales.id = ?;
    `;

    const [sale] = await connection.execute(query, [id]);
    if (!sale.length) return null;
    
    return sale;
};

module.exports = {
    getAllSales,
    getSaleById,
};