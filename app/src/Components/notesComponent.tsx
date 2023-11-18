import { useContext, useState } from "react";
import { Note } from "../App";
import { notesContext } from "../Features/Context/notesContext";

interface dataType {
  idColor: number,
  colorName: string,
   noteId?: number
}

export default function Notes() {
  const { notes, setNotes } = useContext(notesContext)
  const [colorBar, toggleColorBar] = useState<boolean>(false)
  const [color, pickColor] = useState<Array<dataType>>([{idColor: 0, colorName: 'border-white'}])

  // useEffect(() => {
  //   setNotes(data as [])
  // },[data, setNotes])
  
  const deleteNotes = (noteId : number ) => {
    const filtredNotes : Array<Note> | undefined = notes?.filter((note : Note ) => note.id !== noteId)
    setNotes(filtredNotes as [])

    const filteredColorSet: Array<dataType> = color?.filter((color: dataType) => color.noteId !== noteId)
    pickColor(filteredColorSet)
  }

  const changeNoteColor = (noteColor: dataType) => {
    const filteredColorSet: Array<dataType> = color?.filter((color: dataType) => color.noteId !== noteColor?.noteId)
    pickColor([...filteredColorSet, noteColor])
  }

  return (
    notes?.map((note) => (
    <div key={note.id} className="relative flex-[1_1_15rem] w-60 max-w-[16rem] group/globle h-60 max-h-60">
    <div className={`bg-[#3d3d3d] rounded-md p-3 w-full h-full ${color?.find((c) => c.noteId === note.id) && color?.find((c) => c.noteId === note.id)?.colorName} border-t-4 group/close-cross group-hover/globle:border-t-[20px] box-border transition-all`}>
      <div onClick={() => deleteNotes(note.id)} className="absolute top-0 w-5 h-5 right-0 mt-[9px] cursor-pointer invisible group-hover/globle:visible opacity-0 group-hover/globle:opacity-100 transition-all">
            <span className="relative w-full pointer-events-none
          after:absolute after:bg-gray-500 after:block after:w-4 after:h-[1.5px] after:object-center after:delay-75 after:rotate-0 after:group-hover/globle:rotate-45 after:transition-transform
          before:absolute before:bg-gray-600 before:block before:w-4 before:h-[1.5px] before:object-center before:delay-75 before:rotate-0 before:group-hover/globle:-rotate-45 before:transition-transform
        "></span>
        </div>
        <div>
          <strong>{note.title}</strong>
          <p>{note.content}</p>
        </div>
        </div>
        <div className="absolute bottom-0 w-full flex flex-col items-center invisible group/color-bar group-hover/globle:visible">
          <div className={`text-gray-500 ${!colorBar && 'hover:animate-bounce'} opacity-0 transition-all delay-75 group-hover/globle:opacity-100 cursor-pointer`} onClick={() => toggleColorBar((state: boolean) => !state)}>{colorBar ? '-' : '^'}</div>
          <div className={`w-full ${!colorBar? 'h-0' : 'h-7'} overflow-hidden`}>
            <div className={`flex gap-2 h-4 mt-2 translate-y-0 ${!colorBar && 'translate-y-full h-0 mt-0'} transition-all justify-center`}>
              <span className={`w-2.5 h-2.5 bg-white rounded-full cursor-pointer outline-1 ${color?.find((c) => c.idColor === 0 && c.noteId === note.id) && 'outline'} outline-offset-1`} onClick={() => changeNoteColor({idColor: 0, colorName: 'border-white', noteId: note.id})}></span>
              <span className={`w-2.5 h-2.5 bg-red-300 rounded-full cursor-pointer outline-1 ${color?.find((c) => c.idColor === 1 && c.noteId === note.id) && 'outline'} outline-offset-1`} onClick={() => changeNoteColor({idColor: 1, colorName: 'border-red-300' , noteId: note.id})}></span>
              <span className={`w-2.5 h-2.5 bg-blue-300 rounded-full cursor-pointer outline-1 ${color?.find((c) => c.idColor === 2 && c.noteId === note.id) && 'outline'} outline-offset-1`} onClick={() => changeNoteColor({idColor: 2, colorName: 'border-blue-300' , noteId: note.id})}></span>
              <span className={`w-2.5 h-2.5 bg-green-300 rounded-full cursor-pointer outline-1 ${color?.find((c) => c.idColor === 3 && c.noteId === note.id) && 'outline'} outline-offset-1`} onClick={() => changeNoteColor({idColor: 3, colorName: 'border-green-300' , noteId: note.id})}></span>
            </div>
          </div>
        </div>
      </div>
    ))
  )
}