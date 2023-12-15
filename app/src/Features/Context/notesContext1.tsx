import { createContext } from "react";
import { NotesContextProps } from "./notesContextReduce";
import { Note } from "../../App";

type notesType = Note[]

export const initialState: notesType = [];
export const notesContext = createContext<NotesContextProps>({ notes: initialState, setNotes: (() => { }) })