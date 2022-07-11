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
            menssagem: String,
            estrela: Number
        }
    ],
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Produto', ProdutoSchema, 'produtos');