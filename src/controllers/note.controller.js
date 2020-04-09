const notesCtrl = {};
const Note = require("../models/Note");
notesCtrl.renderNoteForm = (req, res) => {
  res.render("notes/new-notes");
};
notesCtrl.createNewNote = async (req, res) => {
  const { title, description } = req.body; //acede a los datos del formulario
  const newNote = new Note({ title, description });
  newNote.user = req.user.id;
  await newNote.save();
  req.flash("succes_msg", "Notes add Succesfully"); //el ms se guarda en el servidor
  res.redirect("/notes");
};
notesCtrl.renderNote = async (req, res) => {
  const notes = await Note.find({ user: req.user.id }).lean().sort({ createdAT: 'desc' });
  res.render("notes/all-notes", { notes });
};
notesCtrl.renderEditForm = async (req, res) => {
  const note = await Note.findById(req.params.id).then((data) => {
    return {
      id: data.id,
      title: data.title,
      description: data.description
    };
  });
  res.render("notes/edit-notes", { note });
};
notesCtrl.updateNote = async (req, res) => {
  const { title, description } = req.body;
  await Note.findByIdAndUpdate(req.params.id, { title, description });
  req.flash("succes_msg", "Notes Update Succesfully"); //el ms se guarda en el servidor
  res.redirect("/notes");
};
notesCtrl.deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  req.flash("succes_msg", "Notes Delete Succesfully"); //el ms se guarda en el servidor
  res.redirect("/notes");
};
module.exports = notesCtrl;
