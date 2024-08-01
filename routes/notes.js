const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');


notes.get('/', (req, res) =>
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

notes.post('/', (req, res) => {
    console.log(req.body, 'request')
    
    const newNote = {
        ...req.body,
        id: uuidv4(),
    };
    readAndAppend(newNote, './db/db.json')
})

module.exports = notes