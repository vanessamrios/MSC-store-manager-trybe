const validateProductId = (req, res, next) => {
    const { productId } = req.body;
  if (!productId) {
    return res.status(400).send({ message: '"productId" is required' });
  }
  return next();
};

const validateQuantity = (req, res, next) => {
    const { quantity } = req.body;
  if (!quantity) {
    return res.status(400).send({ message: '"quantity" is required' });
  }
  if (quantity < 0) {
    return res.status(422).send({ message: '"quantity" must be greater than or equal to 1' });
  }
  return next();
};

module.exports = {
    validateProductId,
    validateQuantity,
};
