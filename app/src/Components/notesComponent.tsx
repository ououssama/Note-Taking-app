import { useContext, useEffect, useState } from "react";
import { Note } from "../App";
import {
  NotesContextProps,
  notesContext,
} from "../Features/Context/notesContextReduce";

interface dataType {
  colorId: number;
  uid?: string;
}

const Theme = [
  'white',
  'red-300',
  'blue-300',
  'green-300'
]

export default function Notes() {
  const { notes, setNotes } = useContext<NotesContextProps>(notesContext);
  const [filtredNotes, setFiltredNotes] = useState<Array<Note> | undefined>();
  const [colorBar, toggleColorBar] = useState<boolean>(false);
  const [color, pickColor] = useState<Array<dataType>>([]);

  useEffect(() => {
    // console.log('updated state', [...notes as []]);
    setFiltredNotes([...notes as []]);
  }, [notes]);

  const deleteNotes = (noteId: string) => {
    const newNotesSet: Array<Note> | undefined = notes?.filter(
      (note: Note) => note._id !== noteId
      );

    setNotes(newNotesSet as []);
    fetch(`http://localhost:3000/delete-note?uid=${noteId}`, {
      method: "delete",
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => {
        console.log({
          message: "Notes has been deleted!",
          payload: res.status,
        });
      })
      .catch((err) =>
        console.log({ message: "Error while adding note", payload: err })
      )
      .finally(() => {
        console.log(notes);
      });

    const filteredColorSet: Array<dataType> = color?.filter(
      (color: dataType) => color.uid !== noteId
    );
    pickColor(filteredColorSet);
  };

  const updateNote = (noteId: string, data: dataType) => {
    fetch(`http://localhost:3000/update-note`, {  
    method: "put",
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        uid: noteId,
        ...data
      })
    })
  }

  const changeNoteColor = (noteColor: dataType) => {
    // const filteredColorSet: Note[] = notes?.filter(
    //   (color: dataType) => color.uid !== noteColor?.uid
    // ) as [];
    updateNote(noteColor.uid as string, { colorId: noteColor.colorId })
    const newNote: Note[] = [];
    notes?.map(note => {
      if (note.uid === noteColor.uid) {
        newNote.push({
          ...note,
          colorId: noteColor.colorId
        }) 
      } else {
        newNote.push({
          ...note
        }) 
      }
    })

    setNotes(newNote)
    // pickColor([...filteredColorSet, noteColor]);
    
  };

  return filtredNotes?.map((note, i) => (
    <div
      key={i}
      className='relative flex-[1_1_15rem] w-60 max-w-[16rem] group/globle h-60 max-h-60'
    >
      <div
        className={`bg-[#3d3d3d] rounded-md p-3 w-full h-full border-${
          notes?.find((c) => c.uid === note.uid) &&
          Theme[notes?.find((c) => c.uid === note.uid)?.colorId as number]
        } border-t-4 group/close-cross group-hover/globle:border-t-[20px] box-border transition-all`}
      >
        <div
          onClick={() => deleteNotes(note?._id as string)}
          className='absolute top-0 w-5 h-5 right-0 mt-[9px] cursor-pointer invisible group-hover/globle:visible opacity-0 group-hover/globle:opacity-100 transition-all'
        >
          <span
            className='relative w-full pointer-events-none
          after:absolute after:bg-gray-500 after:block after:w-4 after:h-[1.5px] after:object-center after:delay-75 after:rotate-0 after:group-hover/globle:rotate-45 after:transition-transform
          before:absolute before:bg-gray-600 before:block before:w-4 before:h-[1.5px] before:object-center before:delay-75 before:rotate-0 before:group-hover/globle:-rotate-45 before:transition-transform
        '
          ></span>
        </div>
        <div>
          <strong>{note.title}</strong>
          <p>{note.content}</p>
        </div>
      </div>
      <div className='absolute bottom-0 w-full flex flex-col items-center invisible group/color-bar group-hover/globle:visible'>
        <div
          className={`text-gray-500 ${
            !colorBar && "hover:animate-bounce"
          } opacity-0 transition-all delay-75 group-hover/globle:opacity-100 cursor-pointer`}
          onClick={() => toggleColorBar((state: boolean) => !state)}
        >
          {colorBar ? "-" : "^"}
        </div>
        <div className={`w-full ${!colorBar ? "h-0" : "h-7"} overflow-hidden`}>
          <div
            className={`flex gap-2 h-4 mt-2 translate-y-0 ${
              !colorBar && "translate-y-full h-0 mt-0"
            } transition-all justify-center`}
          >
            <span
              className={`w-2.5 h-2.5 bg-white rounded-full cursor-pointer outline-1 ${
                notes?.find((c) => c.colorId === 0 && c.uid === note.uid) &&
                "outline"
              } outline-offset-1`}
              onClick={() =>
                changeNoteColor({
                  colorId: 0,
                  uid: note.uid,
                })
              }
            ></span>
            <span
              className={`w-2.5 h-2.5 bg-red-300 rounded-full cursor-pointer outline-1 ${
                notes?.find((c) => c.colorId === 1 && c.uid === note.uid) &&
                "outline"
              } outline-offset-1`}
              onClick={() =>
                changeNoteColor({
                  colorId: 1,
                  uid: note.uid,
                })
              }
            ></span>
            <span
              className={`w-2.5 h-2.5 bg-blue-300 rounded-full cursor-pointer outline-1 ${
                notes?.find((c) => c.colorId === 2 && c.uid === note.uid) &&
                "outline"
              } outline-offset-1`}
              onClick={() =>
                changeNoteColor({
                  colorId: 2,
                  uid: note.uid,
                })
              }
            ></span>
            <span
              className={`w-2.5 h-2.5 bg-green-300 rounded-full cursor-pointer outline-1 ${
                notes?.find((c) => c.colorId === 3 && c.uid === note.uid) &&
                "outline"
              } outline-offset-1`}
              onClick={() =>
                changeNoteColor({
                  colorId: 3,
                  uid: note.uid,
                })
              }
            ></span>
          </div>
        </div>
      </div>
    </div>
  ));
}
