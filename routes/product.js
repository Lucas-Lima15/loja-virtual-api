const express = require('express');
const ProductController = require('../controllers/product-controller');

const router = express.Router()

router.get('/', ProductController.index);

router.post('/', ProductController.addProduct);

router.delete('/', ProductController.deleteProduct);

module.exports = router;