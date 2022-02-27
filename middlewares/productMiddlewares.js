const validateName = (req, res, next) => {
    const { name } = req.body;
  if (!name) {
    return res.status(400).send({ message: '"name" is required' });
  }
  if (name.length < 5) {
    return res.status(422).send({ message: '"name" length must be at least 5 characters long' });
  }
  return next();
};

const validateQuantity = (req, res, next) => {
    const { quantity } = req.body;
  if (quantity === undefined) {
    return res.status(400).send({ message: '"quantity" is required' });
  }
  if (quantity < 1) {
    return res.status(422).send({ message: '"quantity" must be greater than or equal to 1' });
  }
  return next();
};

module.exports = {
    validateName,
    validateQuantity,
};
