const notesCtrl = {};

const Note = require("../models/Note");

//New note
notesCtrl.renderNoteForm = (req,res) =>{
    res.render('notes/new-note');
};

notesCtrl.createNewNote =  async(req,res) =>{
    const {title, description} = req.body;
    const errors = [];
    if(!title){
        errors.push({'text': 'Please Write a Title'});
    }
    if(!description){
        errors.push({'text': 'Please Write a Description'});
    }
    if(errors.length > 0){
        res.render('notes/new-note',{
        errors,
        title,
        description
        });
    }else{
        const newNote = new Note({title, description});
        newNote.user = req.user.id;
        await newNote.save();
        req.flash('success_msg', 'Note Added Successfully');
        res.redirect('/notes');
    }
}

//Get All Note
notesCtrl.renderNotes = async (req,res) =>{
    const notes = await Note.find({user: req.user.id}).sort({date: 'desc'});
    res.render('notes/all-notes', { notes });
}

//Edit Note
notesCtrl.renderEditForm = async (req,res) =>{
    const note = await Note.findById(req.params.id)
    res.render('notes/edit-note', {note});
}

//Update Note
notesCtrl.updateNote = async (req,res) =>{
    const {title, description} = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title, description});
    req.flash('success_msg', 'Note Updated Successfully');
    res.redirect('/notes');
}

//Delete Note
notesCtrl.deleteNote = async (req,res) =>{
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Note Deleted Successfully');
    res.redirect('/notes');
}


module.exports = notesCtrl;