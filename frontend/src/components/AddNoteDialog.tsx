import React from 'react';
import { useForm } from 'react-hook-form';
import { NoteInput } from '../network/notes_api';
import * as NotesApi from '../network/notes_api';
import { Note } from '../typing/note';

type Props = {
  noteToEdit?: Note;
  onDismiss: () => void;
  onNoteSaved: (note: Note) => void;
};

export default function AddNoteDialog({
  noteToEdit,
  onDismiss,
  onNoteSaved,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>({
    defaultValues: {
      title: noteToEdit?.title || '',
      text: noteToEdit?.text || '',
    },
  });
  async function onSubmit(input: NoteInput) {
    try {
      let noteResponse: Note;
      if (noteToEdit) {
        noteResponse = await NotesApi.updateNote(noteToEdit._id, input);
      } else {
        noteResponse = await NotesApi.createNote(input);
      }
      onNoteSaved(noteResponse);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }
  return (
    <form
      id="addNoteForm"
      onSubmit={handleSubmit(onSubmit)}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50"
    >
      <div className="relative z-50 w-1/2 max-w-2xl p-6 mx-auto bg-white rounded-md shadow-lg">
        <div className="flex flex-col justify-between items-center mb-4 space-y-3">
          <input
            {...register('title', { required: 'Required' })}
            placeholder="Title"
            type="text"
            className="text-lg font-semibold border-2 w-full"
          />
          <div typeof="">{errors.title?.message}</div>
          <textarea
            {...register('text')}
            placeholder="Text"
            className="text-sm font-semibold border-2 w-full"
          />
        </div>
        <div className="mb-4">{/* Add your modal content here */}</div>
        <div className="flex justify-end">
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold p-1 md:p-2 rounded mr-2"
            onClick={onDismiss}
          >
            Close
          </button>
          <button
            disabled={isSubmitting}
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-1 md:p-2 rounded"
          >
            Save changes
          </button>
        </div>
      </div>
    </form>
  );
}
