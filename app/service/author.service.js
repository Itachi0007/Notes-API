const { Author } = require("../models/note-model");


// create Author
function newAuthor(req,res) {
    for(var i=0; i<n; i++) {
        if(!authorList[i]._id) {
            const author = new Author({
                name: authorList[i].name,
                age: authorList[i].age,
                notes: []
            });
            author.notes.push(note._id);
            author.save(async function(err, result) {
                try {
                    var isUpdated = await Note.findByIdAndUpdate({_id: note._id}, { $push: {authors : result._id} })
                        .then()
                        .catch(err => { return res.status(500).send( {message: "Some error ocurred", err} ) });
                    if(!isUpdated) {
                        return res.status(500).send( {message: "Some error ocurred", err} );
                    }
                }
                catch(err) {
                    return res.status(500).send( {message: "Some error ocurred", err} )
                }
            })
        }
        // if author has a valid ID
        else {
            Note.findByIdAndUpdate({_id: note._id}, { $push: {authors : authorList[i]._id} })
                .then()
                .catch(err => { return res.status(500).send( {message: "Some error ocurred", err} ) });
    
            Author.findByIdAndUpdate({_id: authorList[i]._id} , { $push : {notes: note._id}})
                .then()
                .catch( err => { return res.status(500).send( {message: "Some error ocurred", err} ) } );
        }
    }
}