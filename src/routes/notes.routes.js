const { Router } = require("express");
const router = Router();

const {
  renderNoteForm,
  createNewNote,
  renderNotes,
  renderEditForm,
  updateNote,
  deleteNote
} = require("../controllers/notes.controller");
/* const Note = require("../models/Note"); */

//Esta autenticacion es para proteger esa ruta
//validar que este logueado
const { isAuthenticated } = require("../helpers/auth");

//New Note
router.get("/notes/add", isAuthenticated, renderNoteForm);

router.post("/notes/new-note", isAuthenticated, createNewNote);

//Get All Note
router.get("/notes", isAuthenticated, renderNotes);

//Edit Notes
router.get("/notes/edit/:id", isAuthenticated, renderEditForm);

//Update Notes
router.put("/notes/edit/:id", isAuthenticated, updateNote);

//Delete Note
router.delete("/notes/delete/:id", isAuthenticated, deleteNote);

module.exports = router;
