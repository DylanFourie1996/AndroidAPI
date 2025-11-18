const Module = require('../models/Module');
const FlashCard = require('../models/FlashCard');

exports.createModule = async (req, res) => {
  try {
    const { moduleName } = req.body;
    if (!moduleName)
      return res.status(400).json({ message: 'moduleName is required' });

    const newModule = new Module({
      userId: req.user.id, 
      moduleName
    });

    await newModule.save();
    res.status(201).json(newModule);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getModules = async (req, res) => {
  try {
    const modules = await Module.find({ userId: req.user.id });
    res.json(modules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateModule = async (req, res) => {
  try {
    const { id } = req.params;
    const { moduleName } = req.body;

    const module = await Module.findOneAndUpdate(
      { _id: id, userId: req.user.id }, // ensure user can only update their own modules
      { moduleName },
      { new: true }
    );

    if (!module) return res.status(404).json({ message: 'Module not found' });
    res.json(module);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteModule = async (req, res) => {
  try {
    const { id } = req.params;

    const module = await Module.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!module) return res.status(404).json({ message: 'Module not found' });

    res.json({ message: 'Module deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createFlashCard = async (req, res) => {
  try {
    const { moduleId, question, answer } = req.body;
    if (!moduleId || !question || !answer)
      return res.status(400).json({ message: 'All fields are required' });

    const newCard = new FlashCard({
      userId: req.user.id, // get userId from authenticated user
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
