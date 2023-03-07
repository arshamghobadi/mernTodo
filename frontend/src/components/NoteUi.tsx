import { Note as NoteModel } from '../typing/note';
import { formateDate } from '../utils/formatDate';
import { HiTrash } from 'react-icons/hi2';
type Props = {
  note: NoteModel;
  onDeleteNoteClicked: (note: NoteModel) => void;
};

const NoteUi = ({ note, onDeleteNoteClicked }: Props) => {
  const { title, text, createdAt, updatedAt } = note;
  let createdUpdatedText: string;
  if (updatedAt > createdAt) {
    createdUpdatedText = 'Updated:' + formateDate(updatedAt);
  } else {
    createdUpdatedText = 'created:' + formateDate(createdAt);
  }
  return (
    <div
      className={` bg-yellow-100 border border-yellow-400  min-h-[400px] max-h-[600px] flex flex-col items-center p-2 space-y-5 hover:shadow-lg ease-in-out duration-300 whitespace-pre-line overflow-hidden cursor-pointer`}
    >
      <div className="font-semibold">{title}</div>
      <div>{text}</div>

      <div>{createdUpdatedText}</div>
      <HiTrash
        onClick={(e) => {
          onDeleteNoteClicked(note);
          e.stopPropagation();
        }}
      />
    </div>
  );
};

export default NoteUi;
