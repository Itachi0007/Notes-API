const { response } = require('express');
const Model = require('../models/note-model.js');
const Author = Model.Author;
const Note = Model.Note;

const body = function (req) {
    if (!req.body.title || !req.body.content) {
        return true;
    }
    else {
        return false;
    }
}

const length = function (req) {
    var n = req.body.authors.length;
    if (n === 0) {
        return false;
    }
    else {
        return true;
    }
}

const author = async function(req,res) {
    const authorList = req.body.authors;
    var n = req.body.authors.length;
    for(var i=0; i<n; i++) {
        if(authorList[i]._id) {
            var isValidAuthor = await Author.findById(authorList[i]._id)
                .then()
                .catch(err => {console.log(err.message); } )
            if(!isValidAuthor) {
                return false;
            }
        }
    }
    return true;
}

module.exports = {
    body,
    length,
    author
};