const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },

    moduleId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Module', 
        required: true 
    },

    title: { 
        type: String, 
        required: true 
    },

    contentText: { 
        type: String, 
        required: true 
    },

    creationDate: { 
        type: Date, 
        default: Date.now 
    },

    modifiedDate: { 
        type: Date, 
        default: Date.now 
    }
}, 
{ 
    timestamps: true 
});

module.exports = mongoose.model('Note', NoteSchema);
