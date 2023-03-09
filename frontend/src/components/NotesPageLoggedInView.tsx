import { useEffect, useState } from 'react';
import { Blocks } from 'react-loader-spinner';
import * as NotesApi from '../network/notes_api';
import { Note as NoteModel } from '../typing/note';
import AddNoteDialog from './AddNoteDialog';
import NoteUi from './NoteUi';

function NotesPageLoggedInView() {
  const [notes, setNote] = useState<NoteModel[]>([]);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [notesLoading, setNotesLoading] = useState(true);
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

  useEffect(() => {
    async function loadNotes() {
      try {
        setShowNotesLoadingError(false);
        setNotesLoading(true);
        const notes = await NotesApi.fetchNotes();
        setNote(notes);
      } catch (error) {
        console.error(error);
        setShowNotesLoadingError(true);
      } finally {
        setNotesLoading(false);
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
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setShowAddNoteDialog(true)}
      >
        Add new note
      </button>
      {notesLoading && (
        <Blocks
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
        />
      )}
      {showNotesLoadingError && (
        <p>Somthing went wrong/please refresh the page</p>
      )}
      {!notesLoading && !showNotesLoadingError && (
        <>
          {notes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full  gap-5 p-10 max-w-6xl mx-auto lg:h-screen">
              {notes.map((item) => (
                <NoteUi
                  onDeleteNoteClicked={deleteNote}
                  key={item._id}
                  note={item}
                  onNoteClicked={setNoteToEdit}
                />
              ))}
            </div>
          ) : (
            <p>You dont have any notes yet</p>
          )}
        </>
      )}

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

        {noteToEdit && (
          <AddNoteDialog
            noteToEdit={noteToEdit}
            onDismiss={() => setNoteToEdit(null)}
            onNoteSaved={(updateNote) => {
              setNote(
                notes.map((existingNote) =>
                  existingNote._id === updateNote._id
                    ? updateNote
                    : existingNote
                )
              );
              setNoteToEdit(null);
            }}
          />
        )}
      </div>
    </>
  );
}

export default NotesPageLoggedInView;
