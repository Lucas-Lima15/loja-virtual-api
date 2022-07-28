const request = require('supertest');
const MongoDB = require('../../util/mongoDb.js');
const App = require('../../app.js');
const ProductService = require('../../services/product-service.js');
const Product = require('../../models/product');

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
        it('should get product', async () => {
            await ProductService.addProduct('Produto Teste', 'Teste', 'Teste');

            const { body } = await request(server)
                .get('/produto')
                .expect(200)

            expect(body.success).toBeTruthy()
            expect(body.products).toBeTruthy()
        })
    })
});
