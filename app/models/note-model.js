const mongoose = require('mongoose');

const AuthorSchema = mongoose.Schema({
    name: { type: String, required: true},
    age: Number,
    notes: [
        {type : mongoose.Schema.Types.ObjectId, ref: 'Note'}
    ]
});

const NoteSchema = mongoose.Schema({
    title: { type: String, required: true},
    content: String,
    authors: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Author'}
    ]
},{
    timestamps: true
});
const Note = mongoose.model('Note',NoteSchema);
const Author = mongoose.model('Author', AuthorSchema);

module.exports = {
    Note,
    Author
}