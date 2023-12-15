/* eslint-disable react-refresh/only-export-components */
import { Note } from "../../App";
import React, { useState, Dispatch, ReactNode, SetStateAction, useEffect} from "react"
import { initialState, notesContext } from "./notesContext1";

interface ParentProps extends React.PropsWithChildren{
  children : ReactNode
}



type notesType = Note[]

export interface NotesContextProps {
    notes?: notesType; // Change the type accordingly
  setNotes: Dispatch<SetStateAction<notesType>>; // Change the type accordingly
    // setNotes: (payload: Note[]) => void; // Change the type accordingly
  }


  
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

export { notesContext };
