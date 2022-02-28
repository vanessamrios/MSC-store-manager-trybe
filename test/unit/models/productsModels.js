const sinon = require('sinon');
const { expect } = require('chai');

const DB = require('../../../models/connection');
const productModel = require('../../../models/productModel');

describe('Cadastra um produto no banco de dados', () => {
  const productMock = {
    name: "brinquedo",
    quantity: 34
  };

  const executeResponse = [{ insertId: 1 }]


  const modelSuccessResponse = {
    id: 1,
    name: "brinquedo",
    quantity: 34
  }

  describe('quando o produto é cadastrado com sucesso', () => {
    before(() => {
      sinon.stub(DB, 'execute').resolves(executeResponse);
    })
  
    after(() => {
      DB.execute.restore()
    })
    
    it('Retorna um objeto com id, name e quantity', async () => {
      const modelResponse = await productModel.createProduct(productMock.name, productMock.quantity)

      expect(modelResponse).to.be.deep.equal(modelSuccessResponse);
    })
    
    it('Retorna null se não for passado o product.name', async () => {
      const modelResponse = await productModel.createProduct(null, productMock.quantity)

      expect(modelResponse).to.be.deep.equal(null);
    })

    it('Retorna null se não for passado o product.quantity', async () => {
      const modelResponse = await productModel.createProduct(productMock.name, null)

      expect(modelResponse).to.be.deep.equal(null);
    })
  })
})