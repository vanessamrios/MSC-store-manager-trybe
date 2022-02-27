const connection = require('./connection');

const getAllProducts = async () => {
    const query = 'SELECT * FROM StoreManager.products ORDER BY id ASC;';
    const [products] = await connection.execute(query);
    return products;
};

const getProductById = async (id) => {
    if (!id) {
        return null;
    }
    const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
    const [product] = await connection.execute(query, [id]);
    if (product.length === 0) return null;
    
    return product[0];
};

const createProduct = async (name, quantity) => {
    if (!name || !quantity) {
        return null;
    }
    const query = `
        INSERT INTO StoreManager.products (name, quantity)
        VALUES (?, ?);
    `;
    const [result] = await connection.execute(query, [name, quantity]);

    const createdProduct = {
        id: result.insertId,
        name,
        quantity,
    };

    return createdProduct;
};

const existsProductByName = async (name) => {
    if (!name) {
        return null;
    }
    const query = 'SELECT * FROM StoreManager.products WHERE name = ?;';
    const [result] = await connection.execute(query, [name]);
    if (result.length) {
        return true;
    }
    return false;
};

const deleteProduct = async (id) => {
    if (!id) {
        return null;
    }
    const query = `
    DELETE FROM StoreManager.products
    WHERE id = ?
  `;
  const [result] = await connection.execute(query, [id]);
  if (result.affectedRows > 0) {
    return true;
  }
  return false;
};

const updateProduct = async (product) => {
    if (!product) {
        return null;
    }
    const query = `
    UPDATE StoreManager.products
    SET
        name = ?,
        quantity = ?
    WHERE
        id = ?
    `;
    const [result] = await connection.execute(query, [product.name, product.quantity, product.id]);
    
    if (!result.affectedRows) {
        return null;
    }
    return product;
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    existsProductByName,
    deleteProduct,
    updateProduct,
};
