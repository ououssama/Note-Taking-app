import { Note } from "../../App";
import React, {createContext, useState, Dispatch, ReactNode, SetStateAction, useEffect} from "react"

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
  
export const AppProviderContext: React.FC<ParentProps> = ({ children }) => {
  const [notesState, setNotesState] = useState<notesType>(initialState)
  
  useEffect(() => {
    fetch('http://localhost:3000/notes', {
      method: 'get',
      headers: {
        "content-type": 'application/json'
      }
    })
      .then(res => res && res.json())
      .then(data => data && setNotesState(prevState => [...prevState, ...data]))
      .catch(err => console.log({ message: 'Unable to recive data', payload: err }))

  }, [])

  return (
    <notesContext.Provider value={{ notes: notesState, setNotes: setNotesState }}>
      {children}
    </notesContext.Provider>
  )
}