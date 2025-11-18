const FlashCard = require('../models/FlashCard');

// Create a flashcard
exports.createFlashCard = async (req, res) => {
    try {
        const { userId, moduleId, question, answer } = req.body;
        if (!userId || !moduleId || !question || !answer)
            return res.status(400).json({ message: 'All fields are required' });

        const newCard = new FlashCard({
            userId,
            moduleId,
            question,
            answer,
            creationDate: new Date()
        });

        await newCard.save();
        res.status(201).json(newCard);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createModule = async (req, res) => {
  try {
    const { userId, moduleName } = req.body;
    if (!userId || !moduleName)
      return res.status(400).json({ message: 'userId and moduleName required' });

    const newModule = new Module({ userId, moduleName });
    await newModule.save();
    res.status(201).json(newModule);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all flashcards for a user (optionally by module)
exports.getFlashCards = async (req, res) => {
    try {
        const { userId, moduleId } = req.query;
        if (!userId) return res.status(400).json({ message: 'userId required' });

        let filter = { userId };
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
        const { userId, question, answer } = req.body;
        if (!userId || !question || !answer)
            return res.status(400).json({ message: 'userId, question, and answer required' });

        const card = await FlashCard.findOneAndUpdate(
            { _id: id, userId },
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
        const { userId } = req.body; // or req.query if you prefer
        if (!userId) return res.status(400).json({ message: 'userId required' });

        const card = await FlashCard.findOneAndDelete({ _id: id, userId });
        if (!card) return res.status(404).json({ message: 'FlashCard not found' });

        res.json({ message: 'FlashCard deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
