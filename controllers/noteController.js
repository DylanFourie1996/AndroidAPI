const Note = require('../models/Note');

// Create a note
exports.createNote = async (req, res) => {
    try {
        const { userId, moduleId, title, contentText } = req.body;

        if (!userId || !moduleId || !title || !contentText) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newNote = new Note({
            userId,
            moduleId,
            title,
            contentText,
            creationDate: new Date(),
            modifiedDate: new Date()
        });

        await newNote.save();
        res.status(201).json(newNote);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// Get notes (optionally filtered by moduleId)
exports.getNotes = async (req, res) => {
    try {
        const { userId, moduleId } = req.query;

        if (!userId) return res.status(400).json({ message: 'userId is required' });

        const filter = { userId: parseInt(userId) };
        if (moduleId) filter.moduleId = parseInt(moduleId);

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

        if (!title || !contentText) {
            return res.status(400).json({ message: 'Title and contentText are required' });
        }

        const updatedNote = await Note.findByIdAndUpdate(
            id,
            { title, contentText, modifiedDate: new Date() },
            { new: true }
        );

        if (!updatedNote) return res.status(404).json({ message: 'Note not found' });

        res.json(updatedNote);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// Delete a note
exports.deleteNote = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedNote = await Note.findByIdAndDelete(id);
        if (!deletedNote) return res.status(404).json({ message: 'Note not found' });

        res.json({ message: 'Note deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};
