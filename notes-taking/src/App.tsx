import {useState, useContext} from "react"
import Notes from "./Components/notesComponent"
import { NotesContextProps, notesContext } from "./Features/Context/notesContext"

export interface Note {
      id: number,
      title: string,
      content: string
}

export default function App() {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const {notes, setNotes } = useContext<NotesContextProps>(notesContext)
  
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    const noteId: number = (notes && notes[notes?.length - 1]?.id) ?? 0
    
    setNotes((prevNotes : Note[]) => { return [...prevNotes, {id: noteId + 1, title: title, content: content}]});
      
      setTitle('');
    setContent('')
    }

    return (
      <div className="flex w-full h-full">
        <form onSubmit={handleSubmit} className="form flex flex-col gap-4 p-6">
          <div className="flex flex-col">
            <input className="rounded-md py-3 px-4 box-border border-[1px] border-gray-600 focus:outline focus:border-none focus:outline-blue-500 transition-all ease-in-out" type="text" name="title" id="title" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="flex flex-col">
            <textarea className="rounded-md py-3 px-4 box-border border-[1px] border-gray-600 focus:outline focus:border-none focus:outline-blue-500 transition-all ease-in-out" name="content" id="content" cols={30} rows={10} placeholder="What's in your mind..." value={content} onChange={(e) => setContent(e.target.value)}></textarea>
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-0 transition-all ease-in-out">Add Note</button>
        </form>

        <div className="bg-[#2a2a2a] h-full w-full p-6 rounded-s-2xl">
          <div className="flex items-start justify-start w-full flex-wrap relative gap-4">
            <notesContext.Provider value={{ notes, setNotes }}>
              <Notes/>
            </notesContext.Provider>
          </div>
        </div>
      </div>
    )
  }
