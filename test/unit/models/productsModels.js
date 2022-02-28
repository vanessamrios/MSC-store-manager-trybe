const sinon = require('sinon');
const { expect } = require('chai');

const DB = require('../../../models/connection');
const productModel = require('../../../models/productModel');

describe('Testa productModels', () => {

  describe('Lista os produtos do banco', () => {
    const product = {
      id: 1,
      name: "brinquedo",
      quantity: 34
    }
    const executeResponse = [[ product ],[]]
  
    const modelSuccessResponse = [ product ]

    before(() => {
      sinon.stub(DB, 'execute').resolves(executeResponse);
    })
  
    after(() => {
      DB.execute.restore()
    })
    it('Retorna um array de produtos', async () => {
      const modelResponse = await productModel.getAllProducts()
      expect(modelResponse).to.be.deep.equal(modelSuccessResponse);
    })
  })

  describe('Busca produto por id', () => {
    const product = {
      id: 1,
      name: "brinquedo",
      quantity: 34
    }

    const executeResponse = [[ product ],[]]

    before(() => {
      sinon.stub(DB, 'execute').resolves(executeResponse);
    })
  
    after(() => {
      DB.execute.restore()
    })

    it('Retorna um objeto', async () => {
      const modelResponse = await productModel.getProductById(product.id);
      expect(modelResponse).to.be.deep.equal(product);
    })

    it('Retorna null se for passado um id null', async () => {
      const modelResponse = await productModel.getProductById(null)
      expect(modelResponse).to.be.null;
    })
  })

  describe('Verifica se existe um produto no banco buscando pelo nome', () => {
    const productMock = {
      name: "Martelo de Thor",
      quantity: 10,
      id: 1
    };

    const executeResponse = [[ productMock ],[]];

    before(() => {
      sinon.stub(DB, 'execute').resolves(executeResponse);
    })
  
    after(() => {
      DB.execute.restore()
    })

    it('Retorna true quando um objeto é encontrado no banco com o name passado', async () => {

      const modelResponse = await productModel.existsProductByName(productMock.name);

      expect(modelResponse).to.be.true;
    })

    it('Retorna null quando o name passado é null', async () => {

      const modelResponse = await productModel.existsProductByName(null);

      expect(modelResponse).to.be.null;
    })
    
  })

  describe('Cadastra um produto no banco', () => {
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

    before(() => {
      sinon.stub(DB, 'execute').resolves(executeResponse);
    })
  
    after(() => {
      DB.execute.restore()
    })
    
    it('Retorna um objeto com id, name e quantity quando a requisição é feita corretamente', async () => {
      const modelResponse = await productModel.createProduct(productMock.name, productMock.quantity)

      expect(modelResponse).to.be.deep.equal(modelSuccessResponse);
    })
    
    it('Retorna null se for passado o product.name null', async () => {
      const modelResponse = await productModel.createProduct(null, productMock.quantity)

      expect(modelResponse).to.be.null;
    })

    it('Retorna null se for passado o product.quantity null', async () => {
      const modelResponse = await productModel.createProduct(productMock.name, null)

      expect(modelResponse).to.be.null;
    })
  })

  describe('Deleta um produto no banco', () => {
    const productMock = {
      name: "Martelo de Loki",
      quantity: 35,
      id: 1
    };

    const executeResponse = [{ affectedRows: 1 }];

    before(() => {
      sinon.stub(DB, 'execute').resolves(executeResponse);
    })
  
    after(() => {
      DB.execute.restore()
    })

    it('Retorna true quando um objeto é deletado do banco', async () => {

      const modelResponse = await productModel.deleteProduct(productMock.id);

      expect(modelResponse).to.be.true;
    })

    it('Retorna null quando é passado um id null', async () => {
      const modelResponse = await productModel.deleteProduct(null)

      expect(modelResponse).to.be.null;

    })

  }) 

  describe('Edita um produto no banco', () => {
    const productMock = {
      name: "Martelo de Loki",
      quantity: 35,
      id: 1
    };

    const executeResponse = [{ affectedRows: 1 }]

    const modelSuccessResponse = {
      name: "Martelo de Loki",
      quantity: 35,
      id: 1
    }

    before(() => {
      sinon.stub(DB, 'execute').resolves(executeResponse);
    })
  
    after(() => {
      DB.execute.restore()
    })

    it('Retorna um objeto com id, name e quantity quando a requisição é feita corretamente', async () => {

      const modelResponse = await productModel.updateProduct(productMock);

      expect(modelResponse).to.be.deep.equal(modelSuccessResponse);
    })

    it('Retorna null quando é passado um product null', async () => {
      const modelResponse = await productModel.updateProduct(null)

      expect(modelResponse).to.be.null;

    })

  })

  

});