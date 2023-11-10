import { Note } from "../App";

interface dataType {
  data: Array<Note> | undefined;
}

export default function Notes({ data }: dataType) {
  return(
  data?.map((note, index) => (
      <div key={index} className='bg-[#3d3d3d] w-60 flex-[1_1_15rem] top-full max-w-[16rem] h-60 max-h-60 rounded-md p-3 border-t-4 hover:border-t-[16px] box-border transition-all'>
        <div key={index}>
          <strong>{note.title}</strong>
          <p>{note.content}</p>
        </div>
      </div>
  )))
}
