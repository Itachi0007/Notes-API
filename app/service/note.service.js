const { response } = require('express');
const model = require('../models/note-model.js');
const Note = model.Note;

const createNote = function (req) {
    const note = new Note({
        title: req.body.note.title,
        content: req.body.note.content,
    });
    const createdNote = await note.save()
        .then(console.log("saved"))
        .catch(err => { console.log(err.message); })
    if (!createdNote) {
        return res.status(500).send({ message: "Couldn't save Note" });
    }

}




module.exports = {
    createNote,
}