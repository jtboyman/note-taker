const router = require('express').Router();
const notes = require('../../db/store');

router.get('/notes', (req, res) => {
    notes.getNotes() //gets the notes array
    .then(notes => res.json(notes)) //turns the array into json
    .catch(err => res.status(500).json(err)); //returns error if bad
});


router.post('/notes', (req, res) => {
    notes.addNotes(req.body) //runs addNotes method using submitted information
    .then(notes => res.json(notes)) //makes it json
    .catch(err => res.status(500).json(err)); //returns error
});

router.delete('/notes/:id', (req, res) => {
    notes.deleteNote(req.params.id)
    .then(() => res.json({ok: true}))
    .catch(err => res.status(500).json(err));
});

module.exports = router;