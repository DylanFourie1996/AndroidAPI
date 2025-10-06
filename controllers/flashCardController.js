const FlashCard = require('../models/FlashCard');

// Create a flashcard
exports.createFlashCard = async (req, res) => {
    try {
        const { moduleId, question, answer } = req.body;
        if (!moduleId || !question || !answer)
            return res.status(400).json({ message: 'All fields are required' });

        const newCard = new FlashCard({
            userId: req.user.id,
            moduleId,
            question,
            answer
        });

        await newCard.save();
        res.status(201).json(newCard);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all flashcards for a user (optionally by module)
exports.getFlashCards = async (req, res) => {
    try {
        const { moduleId } = req.query;
        let filter = { userId: req.user.id };
        if (moduleId) filter.moduleId = moduleId;

        const cards = await FlashCard.find(filter).sort({ creationDate: -1 });
        res.json(cards);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a flashcard
exports.updateFlashCard = async (req, res) => {
    try {
        const { id } = req.params;
        const { question, answer } = req.body;

        const card = await FlashCard.findOneAndUpdate(
            { _id: id, userId: req.user.id },
            { question, answer },
            { new: true }
        );

        if (!card) return res.status(404).json({ message: 'FlashCard not found' });
        res.json(card);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a flashcard
exports.deleteFlashCard = async (req, res) => {
    try {
        const { id } = req.params;

        const card = await FlashCard.findOneAndDelete({ _id: id, userId: req.user.id });
        if (!card) return res.status(404).json({ message: 'FlashCard not found' });

        res.json({ message: 'FlashCard deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
