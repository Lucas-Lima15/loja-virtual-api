const Product = require("../models/product");

class ProductService {
    static async getAllProducts() {
        const products = await Product.find({});

        if (!products.length) {
            return null;
        }

        return products;
    }

    static async findProductById(id) {
        const product = await Product.findById(id);

        return product;
    }

    static async findProductByName(nome) {
        const product = await Product.findByName(nome);

        return product;
    }

    static async addProduct(nome, descricao, categoria) {
        const existProd = await ProductService.findProductByName(nome);
        
        if (existProd) {
            return null;
        }
        
        const prod = {
            nome,
            descricao,
            categoria,
            avaliacoes: [],
            createdAt: new Date(),
            updatedAt: null
        };

        const prodCreated = await Product.create(prod);

        return prodCreated;
    }

    static async updateProduct(prod) {
        const product = await ProductService.findProductById(prod._id);
        
        if (!product) {
            return null;
        }

        product.nome = prod.nome;
        product.descricao = prod.descricao;
        product.categoria = prod.categoria;
        product.updatedAt = new Date();

        await product.save();

        return product;
    }

    static async deleteProduct(prod) {
        const product = await ProductService.findProductById(prod._id);

        if (!product) {
            return null
        }

        await Product.deleteOne(product);

        return product;
    }
}

module.exports = ProductService;