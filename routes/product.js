const express = require('express');
const ProdutoController = require('../controllers/product-controller');

const router = express.Router()

router.get('/', ProdutoController.getProdutos);

router.post('/', ProdutoController.addProduto);

router.delete('/', ProdutoController.deletProduto);

module.exports = router;