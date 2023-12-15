import { useContext, useState } from "react";
import Notes from "./Components/notesComponent";
import {
  NotesContextProps,
  notesContext,
} from "./Features/Context/notesContextReduce";

export interface Note {
  _id?: string;
  uid: string;
  title: string;
  content: string;
}

export default function App() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const { notes, setNotes } = useContext<NotesContextProps>(notesContext);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    // const noteId: number = (notes && notes[notes?.length - 1]?.id) ?? 0
    const curDate: Date = new Date();

    fetch("http://localhost:3000/add-note", {
      method: "post",
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        uid: "NT-" + Math.floor(curDate.getTime() / 1000),
        title: title,
        content: content,
      }),
    })
      .then((res) => {
        console.log({ message: "Notes has been added!"})
        return res.json();
      })
      .then((data) => {
        // return console.log('data:', data);
        setNotes((prevNotes: Note[]) => {
          return [
            ...prevNotes,
            data?.payload,
          ];
        });
      })
      .catch((err) =>
        console.log({ message: "Error while adding note", payload: err })
      );

    setTitle("");
    setContent("");
  };

  return (
    <div className='flex w-full h-full'>
      <div className='flex flex-col'>
        <form
          onSubmit={handleSubmit}
          className='form flex flex-col h-full gap-4 p-6'
        >
          <div className='flex flex-col'>
            <input
              className='rounded-md py-3 px-4 box-border border-[1px] border-gray-600 focus:outline focus:border-none focus:outline-blue-500 transition-all ease-in-out'
              type='text'
              name='title'
              id='title'
              placeholder='Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='flex flex-col'>
            <textarea
              className='rounded-md py-3 px-4 box-border border-[1px] border-gray-600 focus:outline focus:border-none focus:outline-blue-500 transition-all ease-in-out'
              name='content'
              id='content'
              cols={30}
              rows={10}
              placeholder="What's in your mind..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-0 transition-all ease-in-out'
          >
            Add Note
          </button>
        </form>
        <span className='self-center justify-items-stretch pb-3 text-gray-600'>
          Made with ❤️ by me
        </span>
      </div>
      <div className='bg-[#2a2a2a] w-full p-6 rounded-s-2xl h-screen overflow-auto'>
        <div className='flex items-start justify-start w-full flex-wrap relative gap-4'>
          <notesContext.Provider value={{ notes, setNotes }}>
            <Notes />
          </notesContext.Provider>
        </div>
      </div>
    </div>
  );
}
