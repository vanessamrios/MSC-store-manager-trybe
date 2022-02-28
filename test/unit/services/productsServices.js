const sinon = require('sinon');
const { expect } = require('chai');

const productModels = require('../../../models/productModel');
const productServices = require('../../../services/productService');

describe('Testa productServices', () => {
  describe('Lista os produtos do banco', () => {
    const product = {
      id: 1,
      name: "brinquedo",
      quantity: 34
    }
    const modelResponse = [ product ];
  
    const serviceSuccessResponse = [ product ];

    before(() => {
      sinon.stub(productModels, 'getAllProducts').resolves(modelResponse);
    })
  
    after(() => {
      productModels.getAllProducts.restore()
    })
    it('Retorna um array de produtos', async () => {
      const serviceResponse = await productServices.getAll();
      expect(serviceResponse).to.be.deep.equal(serviceSuccessResponse);
    })
  })

  describe('Busca produto por id', () => {
    const product = {
      id: 1,
      name: "brinquedo",
      quantity: 34
    }

    before(() => {
      sinon.stub(productModels, 'getProductById').resolves(product);
    })
  
    after(() => {
      productModels.getProductById.restore();
    });

    it('Retorna um objeto com id, name e quantity', async () => {
      const serviceResponse = await productServices.getProductById(product.id)
    
      expect(serviceResponse).to.be.deep.equal(product);
    });
  })

  describe('Cadastra um produto no banco', () => {
    const productData = {
      name: "brinquedo",
      quantity: 34
    };

    const modelResponse = {
      id: 1,
      name: "brinquedo",
      quantity: 34
    };

    before(() => {
      sinon.stub(productModels, 'createProduct').resolves(modelResponse);
    })

    after(() => {
      productModels.createProduct.restore();
    });

    it('Retorna um objeto com id, name e quantity', async () => {
      const serviceResponse = await productServices.createProduct(productData)
    
      expect(serviceResponse).to.be.deep.equal(modelResponse);
    });
  });

  describe('Edita um produto no banco', () => {
    const productData = {
      name: "Martelo de Loki",
      quantity: 35,
      id: 1
    };

    const modelResponse = {
      name: "Martelo de Loki",
      quantity: 35,
      id: 1
    };

    before(() => {
      sinon.stub(productModels, 'updateProduct').resolves(modelResponse);
    })

    after(() => {
      productModels.updateProduct.restore();
    });

    it('Retorna um objeto com id, name e quantity', async () => {
      const serviceResponse = await productServices.updateProduct(productData)
    
      expect(serviceResponse).to.be.deep.equal(modelResponse);
    });
  });

  describe('Deleta um produto no banco', () => {
    const productMock = {
      name: "Martelo de Loki",
      quantity: 35,
      id: 1
    };
    before(() => {
      sinon.stub(productModels, 'deleteProduct').resolves(true);
    })

    after(() => {
      productModels.deleteProduct.restore();
    });

    it('Retorna true quando um objeto é deletado do banco', async () => {
      const serviceResponse = await productServices.deleteProduct(productMock.id)
    
      expect(serviceResponse).to.be.true;
    });
  })

})