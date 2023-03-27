const Note = require('../models/note');

exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).json({ message: 'Note not found' });
      return;
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createNote = async (req, res) => {
  const { title, content, type } = req.body;
  if (!title || !content || !type) {
    res.status(400).json({ message: 'Title, content and type are required' });
    return;
  }
  try {
    const note = new Note({
      title,
      content,
      type,
    });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateNote = async (req, res) => {
  const { title, content, type } = req.body;
  if (!title || !content || !type) {
    res.status(400).json({ message: 'Title, content and type are required' });
    return;
  }
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).json({ message: 'Note not found' });
      return;
    }
    note.title = title;
    note.content = content;
    note.type = type;
    await note.save();
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      res.status(404).json({ message: 'Note not found' });
      return;
    }
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
