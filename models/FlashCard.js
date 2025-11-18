const mongoose = require('mongoose');


/*
userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // 3
    moduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Module', required: true }, // 1
*/
const FlashCardSchema = new mongoose.Schema({ // 6debadqwue722107ejajdadj
    userId: { type: String, required: true }, // 3
    moduleId: { type: String, required: true }, // 1
    question: { type: String, required: true },
    answer: { type: String, required: true },
    creationDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('FlashCard', FlashCardSchema);
