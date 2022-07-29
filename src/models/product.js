const mongoose = require('mongoose');

const ProdutoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    avaliacoes: [
        {
            userId: mongoose.Schema.Types.ObjectId,
            mensagem: String,
            estrela: Number
        }
    ],
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        default: null
    }
});

const Product = mongoose.model('Produto', ProdutoSchema, 'produtos');

Product.findByName = nome => {
    return Product.findOne({ nome: nome });
};

module.exports = Product;