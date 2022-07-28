const request = require('supertest');
const MongoDB = require('../../util/mongoDb.js');
const App = require('../../app.js');
const Product = require('../../models/product');
const productMock = require('../mock/product');

const app = new App();
const server = app.express;

describe('ProductController', () => {
    beforeAll(async () => {
        await MongoDB.connectTest();
    });

    afterAll(async () => {
        await MongoDB.closeConnectionDropDatabase();
    });

    beforeEach(async () => {
        await Product.deleteMany({});
    });

    describe('/produto GET', () => {
        it('should get array of products and success true', async () => {
            await Product.create(productMock);

            const { body } = await request(server)
                .get('/produto')
                .expect(200);

            expect(body.success).toBeTruthy();
            expect(body.products).toBeTruthy();
        });

        it('shouldnt get message error and success false', async () => {
            const { body } = await request(server)
                .get('/produto')
                .expect(404);

            expect(body.success).toBeFalsy();
            expect(body.message).toEqual('Não há produtos cadastrados.');
        });
    });

    describe('/produto POST', () => {
        it('should add a product and success true', async () => {
            const json = {
                nome: 'PlayStation 2',
                descricao: 'Diversão para toda família',
                categoria: 'Consoles'
            }
            const { body } = await request(server)
                .post('/produto')
                .send(json)
                .expect(200);

            expect(body.success).toBeTruthy();
            expect(body.product).toBeTruthy();
        });

        it('shouldnt able to add product and success false', async () => {
            await Product.create(productMock);
            const json = {
                nome: productMock.nome,
                descricao: productMock.descricao,
                categoria: productMock.categoria
            }
            const { body } = await request(server)
                .post('/produto')
                .send(json)
                .expect(400);

            expect(body.success).toBeFalsy();
            expect(body.message).toEqual(`Produto ${json.nome} já existe na base de dados.`);
        });
    });

    describe('/produto/:id GET', () => {
        it('should get a product and success true', async () => {
            await Product.create(productMock);

            const { body } = await request(server)
                .get(`/produto/${productMock._id}`)
                .expect(200);

            expect(body.success).toBeTruthy();
            expect(body.product).toBeTruthy();
        });

        it('shouldnt be able to get product and success false', async () => {
            const { body } = await request(server)
                .get(`/produto/${productMock._id}`)
                .expect(404);

            expect(body.success).toBeFalsy();
            expect(body.message).toEqual('Produto não existe na base de dados.');
        });
    });

    describe('/produto/:id PUT', () => {
        it('should get a updated product and success true', async () => {
            await Product.create(productMock);
            const json = {
                nome: 'PlayStation 7',
                descricao: 'Console incomum',
                categoria: 'Imaginacão'
            }

            const { body } = await request(server)
                .put(`/produto/${productMock._id}`)
                .send(json)
                .expect(200);
                
            expect(body.success).toBeTruthy();
            expect(body.product).toBeTruthy();
        });

        it('shouldnt be able to update product and success false', async () => {
            const json = {
                nome: 'PlayStation 7',
                descricao: 'Console incomum',
                categoria: 'Imaginacão'
            }

            const { body } = await request(server)
                .put(`/produto/${productMock._id}`)
                .send(json)
                .expect(404)
                
            expect(body.success).toBeFalsy();
            expect(body.message).toEqual('Produto não existe na base de dados.');
        });
    });

    describe('/produto/:id DELETE', () => {
        it('should be able to delete product and success true', async () => {
            await Product.create(productMock);

            const { body } = await request(server)
                .delete(`/produto/${productMock._id}`)
                .expect(200);
            
            expect(body.success).toBeTruthy();
            expect(body.product).toBeTruthy();
        });

        it('shouldnt be able ro delete product and success false', async () => {
            const { body } = await request(server)
                .delete(`/produto/${productMock._id}`)
                .expect(404);
            
            expect(body.success).toBeFalsy();
            expect(body.message).toEqual('Produto não existe na base de dados.');
        });
    });
});
