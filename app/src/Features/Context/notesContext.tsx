import { Note } from "../../App";
import React, {createContext, useState, Dispatch, ReactNode, SetStateAction} from "react"

interface ParentProps extends React.PropsWithChildren{
  children : ReactNode
}

type notesType = Note[]

export interface NotesContextProps {
    notes?: notesType; // Change the type accordingly
    setNotes: Dispatch<SetStateAction<Note[]>>; // Change the type accordingly
    // setNotes: (payload: Note[]) => void; // Change the type accordingly
  }
  
  const initialState: notesType = [];

export const notesContext = createContext<NotesContextProps>({ notes: initialState, setNotes: () => { } })
  
export const AppProviderContext : React.FC<ParentProps> = ({ children }) => {
  const [ notesState, setNotesState ] = useState<notesType>(initialState)
  return (
    <notesContext.Provider value={{ notes: notesState, setNotes: setNotesState }}>
      {children}
    </notesContext.Provider>
  )
}