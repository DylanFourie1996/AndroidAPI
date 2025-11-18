const Module = require('../models/Module');

// Create a module
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

// Get all modules for a user
exports.getModules = async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId) return res.status(400).json({ message: 'userId required' });

        const modules = await Module.find({ userId });
        res.json(modules);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update module by ID
exports.updateModule = async (req, res) => {
    try {
        const { id } = req.params;
        const { moduleName } = req.body;

        const module = await Module.findByIdAndUpdate(id, { moduleName }, { new: true });
        if (!module) return res.status(404).json({ message: 'Module not found' });

        res.json(module);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete module by ID
exports.deleteModule = async (req, res) => {
    try {
        const { id } = req.params;

        const module = await Module.findByIdAndDelete(id);
        if (!module) return res.status(404).json({ message: 'Module not found' });

        res.json({ message: 'Module deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
