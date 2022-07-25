const mongoose = require('mongoose');

class MongoDB {
    static connect(test = false) {
        const URI = MongoDB.getUri(test);

        return mongoose.connect(URI);
    }

    static  closeConnection() {
        mongoose.connection.close();
    }

    static getUri(test) {
        if (test) {
            return  'mongodb://localhost:27017/loja-virtual-test';
        } else {
            return 'mongodb://localhost:27017/loja-virtual';
        }
    }
}

module.exports = MongoDB;