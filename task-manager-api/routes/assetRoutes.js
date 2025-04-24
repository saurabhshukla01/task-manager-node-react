const express = require('express');
const router = express.Router();
const assetController = require('../controllers/assetController');
const protect = require('../middleware/authMiddleware');
const { allowRoles } = require('../middleware/roleMiddleware');
const { assetValidation } = require('../validators/assetValidator');

// Check protect is a function
if (typeof protect !== 'function') {
  throw new Error('`protect` middleware is not a function. Check your import.');
}

router.use(protect); // Now this is safe

router
  .route('/')
  .get(assetController.getAssets)
  .post(allowRoles('admin'), assetValidation, assetController.createAsset);

router
  .route('/:id')
  .put(allowRoles('admin'), assetValidation, assetController.updateAsset)
  .delete(allowRoles('admin'), assetController.deleteAsset);

module.exports = router;
