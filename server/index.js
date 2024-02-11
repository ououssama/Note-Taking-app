import express from 'express'
import cors from 'cors'
import './db/connexion.js';
import { getNotes, addNote, deleteNote, updateNote } from './routes/notes.js';

const PORT = process.env.PORT || '';
const app = express()

app.use(cors())
app.use(express.json());

app.get('/notes', getNotes);
app.post('/add-note', addNote);
app.put('/update-note', updateNote)
app.delete('/delete-note', deleteNote);

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})