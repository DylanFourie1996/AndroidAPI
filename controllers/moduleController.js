const Module = require('../models/Module');

// Create a module
exports.createModule = async (req, res) => {
    try {
        const { moduleName } = req.body;
        if (!moduleName) return res.status(400).json({ message: 'Module name required' });

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

// Get all modules for logged-in user
exports.getModules = async (req, res) => {
    try {
        const modules = await Module.find({ userId: req.user.id });
        res.json(modules);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a module
exports.updateModule = async (req, res) => {
    try {
        const { id } = req.params;
        const { moduleName } = req.body;

        const module = await Module.findOneAndUpdate(
            { _id: id, userId: req.user.id },
            { moduleName },
            { new: true }
        );

        if (!module) return res.status(404).json({ message: 'Module not found' });
        res.json(module);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a module
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
