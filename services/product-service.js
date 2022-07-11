const Produto = require("../models/product");

class ProductService {
    async getAllProducts() {

        const products = await Produto.find({});

        if (!products.length) {
            return {
                success: false,
                message: 'Não existem produtos cadastrados'
            };
        }

        return {
            success: true,
            produtos: products
        };
    }

    async addProduct(nome, descricao, categoria) {
        const prod = {
            nome,
            descricao,
            categoria,
            avaliacoes: [],
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const existProd = await Produto.exists({nome: prod.nome});

        if (existProd) {
            return {
                success: false,
                message: 'Produto já existe'
            }
        }

        const prodCreated = await Produto.create(prod);

        return {
            success: true,
            message: 'Produto criado com sucesso',
            produto: prodCreated
        };
    }

    async deleteProduct(product) {
        const existProd = await Product.findOne(product);

        if (!existProd) {
            return null
        }

        const prodDeleted = await Product.deleteOne(product);

        return prodDeleted;
    }

    getProductsNome(products) {
        return products.map(product => product.nome);
    }
}

module.exports = new ProductService()