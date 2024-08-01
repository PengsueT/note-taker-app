const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');


notes.get('/', (req, res) =>
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

notes.post('/', (req, res) => {
    console.log(req.body, 'request')

    const newNote = {
        ...req.body, // spread operator
        id: uuidv4(),
    };
    readAndAppend(newNote, './db/db.json')
})

notes.delete('/:id', (req, res) => {
    console.log(req.params, "delete path test")
    const uniqueId = req.params.id;

    readFromFile('./db/db.json',)
        .then((data) => JSON.parse(data))
        .then((notes) => {
            const updatedNotes = notes.filter((note) => note.id !== uniqueId);
            writeToFile('./db/db.json', updatedNotes);
            res.json(`Note with ID: ${uniqueId} deleted successfully!`);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json('Error in deleting note');
        });
});

module.exports = notes