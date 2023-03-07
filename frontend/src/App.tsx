import { useEffect, useState } from 'react';
import AddNoteDialog from './components/AddNoteDialog';

import NoteUi from './components/NoteUi';
import * as NotesApi from './network/notes_api';
import { Note as NoteModel } from './typing/note';

function App() {
  const [notes, setNote] = useState<NoteModel[]>([]);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

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
  async function deleteNote(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id);
      setNote(notes.filter((existingNote) => existingNote._id !== note._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <div className=" h-auto bg-gray-200 ">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setShowAddNoteDialog(true)}
      >
        Add new note
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full  gap-5 p-10 max-w-6xl mx-auto lg:h-screen">
        {notes.map((item) => (
          <NoteUi onDeleteNoteClicked={deleteNote} key={item._id} note={item} />
        ))}
      </div>
      <div>
        {showAddNoteDialog && (
          <AddNoteDialog
            onDismiss={() => setShowAddNoteDialog(false)}
            onNoteSaved={(newNote) => {
              setNote([...notes, newNote]);
              setShowAddNoteDialog(false);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;
