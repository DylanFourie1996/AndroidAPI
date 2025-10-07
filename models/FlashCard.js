const mongoose = require('mongoose');

const FlashCardSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    moduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Module', required: true },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    creationDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('FlashCard', FlashCardSchema);
