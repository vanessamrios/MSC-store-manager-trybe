require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const productController = require('./controllers/productController');
const saleController = require('./controllers/saleController');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products/:id', productController.getProductById);

app.get('/products', productController.getAll);

app.get('/sales/:id', saleController.getSaleById);

app.get('/sales', saleController.getAll);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
