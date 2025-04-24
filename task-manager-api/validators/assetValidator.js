const { body } = require('express-validator');

exports.assetValidation = [
  body('name').notEmpty().withMessage('Asset name is required'),
  body('secretKey').notEmpty().withMessage('Secret key is required'),
];
