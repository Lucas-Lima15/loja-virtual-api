const mongoose = require('mongoose');

class MongoDB {
    static async connect() {
        return await mongoose.connect('mongodb://localhost:27017/loja-virtual');
    }

    static async connectTest() {
        return await mongoose.connect('mongodb://localhost:27017/loja-virtual-test', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }

    static async closeConnectionDropDatabase() {
        await mongoose.connection.db.dropDatabase();
        await mongoose.disconnect();
    }

    static getUri(test) {
        if (test) {
            return 'mongodb://localhost:27017/loja-virtual-test';
        } else {
            return 'mongodb://localhost:27017/loja-virtual';
        }
    }
}

module.exports = MongoDB;