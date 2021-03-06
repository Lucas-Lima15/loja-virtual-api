const mongoose = require("mongoose");
const Product = require("../../models/product");
const ProductService = require("../../services/product-service");
const MongoDB = require("../../util/mongoDb");
const productMock = require('../mock/product');

describe('ProductService', () => {

    beforeAll(async () => {
        await MongoDB.connectTest();
    });

    afterAll(async () => {
        await MongoDB.closeConnectionDropDatabase();
    });

    beforeEach(async () => {
        await Product.deleteMany({});
    });

    describe('getAllProducts', () => {
        it('should return products if product exist', async () => {

            await Product.create(productMock);

            const products = await ProductService.getAllProducts();

            expect(products).toBeTruthy();
        });

        it('should return products null if there is no product', async () => {
            const products = await ProductService.getAllProducts();

            expect(products).toBe(null);
        });
    });

    describe('findProductById', () => {
        it('should return product if product exist', async () => {
            const prod = await Product.create(productMock);

            const product = await ProductService.findProductById(prod._id);

            expect(product).toBeTruthy();
        });

        it('should return product null if product dosent exist', async () => {
            const product = await ProductService.findProductById(productMock._id);

            expect(product).toBe(null);
        });
    });

    describe('findProductByName', () => {
        it('should return product if product exist', async () => {
            const prod = await Product.create(productMock);

            const product = await ProductService.findProductByName(prod.nome);

            expect(product).toBeTruthy();
        });

        it('should return product null if product dosent exist', async () => {
            const product = await ProductService.findProductByName('teste');

            expect(product).toBe(null);
        });
    });

    describe('addProduct', () => {
        it('should return product if was able to added', async () => {
            const { nome, descricao, categoria } = productMock;
            const product = await ProductService.addProduct(nome, descricao, categoria);

            expect(product).toBeTruthy();
        });

        it('should return product null if product already exists', async () => {
            await Product.create(productMock);

            const { nome, descricao, categoria } = productMock;
            const product = await ProductService.addProduct(nome, descricao, categoria);

            expect(product).toBe(null);
        })
    });

    describe('updateProduct', () => {
        it('should return product if was able to updated', async () => {
            const prod = await Product.create(productMock);

            prod.nome = 'Nome Atualizado';
            prod.descricao = 'Descri????o Atualizada';
            prod.categoria = 'Categoria Atualizada';

            const { nome, descricao, categoria, updatedAt } = await ProductService.updateProduct(prod);

            expect(nome).toBe('Nome Atualizado');
            expect(descricao).toBe('Descri????o Atualizada');
            expect(categoria).toBe('Categoria Atualizada');
            expect(updatedAt).toBeTruthy();
        });

        it('should return product null if product dosent exist', async () => {
            const product = await ProductService.updateProduct(productMock._id, 'Nome Atualizado', 'Descri????o Atualizada', 'Categoria Atualizada');

            expect(product).toBe(null);
        });
    });

    describe('deleteProduct', () => {
        it('should return product if was able to delete product', async () => {
            const prod = await Product.create(productMock);

            const product = await ProductService.deleteProduct(prod);

            expect(product).toBeTruthy();
        });

        it('should return product null if product dosent exist', async () => {
            const product = await ProductService.deleteProduct({ _id: productMock._id });

            expect(product).toBe(null);
        });
    });

});