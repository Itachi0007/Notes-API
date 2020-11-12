const { response } = require('express');
const Model = require('../models/note-model.js');
const Author = Model.Author;
const Note = Model.Note;
const authorService = require('../service/author.service.js');


=======
const validation = require('../utilities/validation.js');
const bodyValidation = validation.validationBody();
const lengthValidation = validation.validationLength();
const noteService = require('../service/note.service.js');
const noteCreate = noteService.createNote();
>>>>>>> 37062faa3d0b5111c5a58bad0ae212e338c042c7
// create and save new note
exports.create = async function (req, res) {
    console.log("========================================");
    // validate req
    if (bodyValidation(req.body.note.content) || bodyValidation(req.body.note.title)) {
        return res.status(400).send({ message: "Content/Title cannot be empty!" });
    }
    var n = req.body.authors.length;
    if (lengthValidation(n)) {
        return res.status(400).send({ message: "Authors cannot be empty!" });
    }
    const authorList = req.body.authors;
    // validate authorID
    for (var i = 0; i < n; i++) {
        if (authorList[i]._id) {
            var isValidAuthor = await Author.findById(authorList[i]._id)
                .then()
                .catch(err => { console.log(err.message); })
            if (!isValidAuthor) {
                return res.status(400).send({ message: "Invalid AuthorID" });
            }
        }
    };
    // create Note
    noteCreate(req);
    // const note = new Note({
    //     title: req.body.note.title,
    //     content: req.body.note.content,
    // });
    // const createdNote = await note.save()
    //     .then(console.log("saved"))
    //     .catch(err => { console.log(err.message); })
    // if (!createdNote) {
    //     return res.status(500).send({ message: "Couldn't save Note" });
    // }
    // create Author
    const isAuthorCreated = await authorService.newAuthor(req,res)
        .then()
        .catch(err => { console.log(err.message); })
    if(!isAuthorcreated) {
        return res.status(500).send( {message: "Couldn't create Author"} );
    }
    
    res.send({message: "Note saved successfully"});
};
// retrieve and show all notes
exports.findAll = (req, res) => {
    Note.find({}, '-_id title content')
        .populate({ path: 'authors', select: 'name age' })
        .exec(function (err, note) {
            if (err) {
                return res.status(500).send(err.message);
            }
            var dict = {
                status: response.statusCode,
                message: "Success",
                method: req.method,
                detail: "http://localhost:3000" + req.url,
                data: note
            };
            return res.send(dict);
        })

};
// find a single note with noteID
exports.findOne = (req, res) => {
    Note.findById(req.params.noteid)
        .populate({ path: 'authors', select: 'name age' })
        .then(note => {
            if (!note) {
                return res.status(500).send({ message: "Error 404, Note not found with id " + req.params.noteId })
            }
            var dict = {
                status: response.statusCode,
                message: "Success",
                method: req.method,
                details: "http://localhost:3000" + req.url,
                data: note
            };
            res.send(dict);
        })
        .catch(err => {
            if (err.kind === 'Objectid') {
                return res.status(404).send({ message: "Error 404, Note not found with id " + req.params.noteId })
            }
            return res.status(500).send({ message: "Some error ocurred ID wala" });
        })

};
// find note by search title post
exports.search = (req, res) => {
    var searchBody = req.body;
    var searchString = searchBody.title;
    const query1 = { 'title': { $regex: searchString, $options: "$i" } };
    Note.find(query1, "title")
        .populate({ path: 'authors', select: 'name age' })
        .then(note => {
            if (note.length == 0) {
                return res.status(500).send({ message: "Error 404, Note not found with title " + req.params.title })
            }
            var dict = {
                status: response.statusCode,
                message: "Success",
                method: req.method,
                details: "http://localhost:3000" + req.url,
                data: note
            };
            res.send(dict);
        })
        .catch(err => {
            if (err.kind === 'Objectid') {
                return res.status(404).send({ message: "Error 404, Note not found with title " + req.params.title })
            }
            return res.status(500).send({ message: "Some error ocurred title wala" });
        })
}

// update a note by noteID
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.content) {
        return res.status(400).send({ message: "Note content can not be empty" });
    }
    // find and update the note
    Note.findByIdAndUpdate(req.params.noteid, {
        title: req.body.title,
        content: req.body.content
    }, { new: true })
        .then(note => {
            if (!note) {
                return res.status(404).send({ message: "Note not found with id " + req.params.noteId });
            }
            res.send(note);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({ message: "Note not found with id " + req.params.noteId });
            }
            return res.status(500).send({ message: "Error updating note with id " + req.params.noteId });
        });

};
// delete a note by noteID
exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.noteid)
        .then(note => {
            if (!note) {
                return res.status(404).send({ message: "Note not found with id " + req.params.noteId });
            }
            res.send({ message: "Note deleted successfully!" });
        })
        .catch(err => {
            if (err.kind === 'Objectid' || err.name === 'Notfound') {
                return res.status(404).send({ message: "Note not found with id " + req.params.noteId });
            }
            return res.status(500).send({ message: "Could not delete note with id " + req.params.noteId })
        });
};