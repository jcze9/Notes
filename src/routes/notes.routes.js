const { Router } = require("express");
const router = Router();
const {
  renderNoteForm,
  createNewNote,
  renderNote,
  renderEditForm,
  updateNote,
  deleteNote
} = require("../controllers/note.controller");
const { isAuthenticated } = require('../helpers/auth')
//New Notes
router.get("/notes/add", isAuthenticated, renderNoteForm);
router.post("/notes/new-note", isAuthenticated, createNewNote); //enviar datos
//Get All Notes
router.get("/notes", isAuthenticated, renderNote);
//edit Notes
router.get("/notes/edit/:id", isAuthenticated, renderEditForm);
router.put("/notes/edit/:id", isAuthenticated, updateNote); //actulizar datos
//Delete Note
router.delete("/notes/delete/:id", isAuthenticated, deleteNote);
module.exports = router;
