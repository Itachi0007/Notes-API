module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');

    // create a new note
    app.post('/notes', notes.create);
    // retrieve all notes
    app.get('/notes',notes.findAll);
    // retrieve single note with noteid
    app.get('/notes/searchbyid/:noteid', notes.findOne);
    // retrieve note by POST query of title 
    app.post('/notes/search', notes.search);
    // update note with noteID
    app.put('/notes/:noteid', notes.update);
    // delete a note with noteID
    app.delete('/notes/:noteid', notes.delete);
};