const express = require('express');
const ProductController = require('../controllers/product-controller');

const router = express.Router()

router.get('/', ProductController.getProducts);

router.post('/', ProductController.addProduct);

router.get('/:id', ProductController.getProduct);

router.put('/:id', ProductController.updateProduct);

router.delete('/:id', ProductController.deleteProduct);

module.exports = router;