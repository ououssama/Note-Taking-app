import mongoose from "mongoose"
import { Note } from "../Models/notesModel.js"
import { ObjectId } from "mongodb"

const getNotes = (async (req, res) => {
    try { 
        const notes = await Note.find()
        res.status(200).json(notes)
    } catch (error) {
        console.error('Error retriving data:', error);
        res.status(500).json({'message': 'Internal Server Error'});
    }
})

const addNote = (async (req, res) => {
    try {

        const newNote = new Note({
            uid: req.body.uid,
            title: req.body.title,
            content: req.body.content
        })

        await newNote.save()
        console.log(newNote);
        res.status(201).json({'Message': 'New Note has been added!', 'payload': newNote})

    } catch (error) {
        console.error('Error adding note:', error);
        res.status(500).json({'message': 'Internal Server Error'});
    }
})

const deleteNote = (async (req, res) => {
    try {
        console.log(req.query.uid);
        const deletedNote = await Note.deleteOne({_id: ObjectId(req.query.uid)})
        res.status(200).json({'Message': 'Note has been deleted! '+ deletedNote.deletedCount})
    } catch (error) {
        console.error('Error Deleting note:', error);
        res.status(500).json({'message': 'Internal Server Error'});
    }
})

export {getNotes, addNote, deleteNote}