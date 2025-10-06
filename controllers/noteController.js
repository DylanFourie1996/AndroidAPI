// controllers/noteController.js
const Note = require('../models/Note');

// Create a note
exports.createNote = async (req, res) => {
    try {
        const { moduleId, title, contentText } = req.body;

        if (!moduleId || !title || !contentText) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newNote = new Note({
            userId: req.user.id,
            moduleId,
            title,
            contentText,
            creationDate: new Date(),  // ensure creationDate is set
            modifiedDate: new Date()
        });

        await newNote.save();
        res.status(201).json(newNote);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// Get all notes for a user (optionally filter by module)
exports.getNotes = async (req, res) => {
    try {
        const { moduleId } = req.query;
        const filter = { userId: req.user.id };
        if (moduleId) filter.moduleId = moduleId;

        const notes = await Note.find(filter).sort({ creationDate: -1 });
        res.json(notes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// Update a note
exports.updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, contentText } = req.body;

        const note = await Note.findOneAndUpdate(
            { _id: id, userId: req.user.id },
            { title, contentText, modifiedDate: new Date() },
            { new: true }
        );

        if (!note) return res.status(404).json({ message: 'Note not found' });
        res.json(note);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// Delete a note
exports.deleteNote = async (req, res) => {
    try {
        const { id } = req.params;

        const note = await Note.findOneAndDelete({ _id: id, userId: req.user.id });
        if (!note) return res.status(404).json({ message: 'Note not found' });

        res.json({ message: 'Note deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};
