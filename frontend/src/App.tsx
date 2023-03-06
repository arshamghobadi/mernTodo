import { useEffect, useState } from 'react';

import NoteUi from './components/NoteUi';
import * as NotesApi from './network/notes_api';
import { Note as NoteModel } from './typing/note';

function App() {
  const [note, setNote] = useState<NoteModel[]>([]);

  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NotesApi.fetchNotes();
        setNote(notes);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadNotes();
  }, []);

  return (
    <div className=" h-auto bg-gray-200 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full  gap-5 p-10 max-w-6xl mx-auto lg:h-screen">
        {note.map((item) => (
          <NoteUi key={item._id} note={item} />
        ))}
      </div>
    </div>
  );
}

export default App;
