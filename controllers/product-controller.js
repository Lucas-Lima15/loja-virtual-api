const express = require('express');
const ProductService = require('../services/product-service');

const router = express.Router()

router.get('/produto', async (req, res) => {
    const products = await ProductService.getAllProducts();

    if (!products) {
        return res.statusCode(404).json({
            success: false,
            message: 'Não há produtos cadastrados'
        });
    }

    res.json({
        success: true,
        products
    });
});

router.post('/produto', async (req, res) => {
    const { nome, descricao, categoria } = req.body;

    const product = await ProductService.addProduct(nome, descricao, categoria);

    if (!product) {
        res.statusCode(400).json({
            success: false,
            message: `Produto ${nome} já existe na base de dados`
        })
    }

    res.json({
        success: true,
        product
    });
});

router.get('/produto/:id', async (req, res) => {
    const { id } = req.params;

    const product = await ProductService.findProductById(id);

    if (!product) {
        return res.statusCode(404).json({
            success: false,
            message: `Produto não existe na base de dados.`
        });
    }

    return res.json({
        success: true,
        product
    });
});

router.put('/produto/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, descricao, categoria } = req.body;

    const product = await ProductService.updateProduct({ id, nome, descricao, categoria });

    if (!product) {
        res.statusCode(400).json({
            success: false,
            message: 'Ocorreu um erro'
        });
    }

    res.json({
        success: true,
        product
    });
});

router.delete('/produto/:id', async (req, res) => {
    const { id } = req.params;

        const product = await ProductService.deleteProduct(id);

        if (!product) {
            res.statusCode(404).json({
                succes: false,
                message: 'Produto não existe'
            });
        }

        res.json({
            success: true,
            product
        });
});

module.exports = router;