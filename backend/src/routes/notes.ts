import express from 'express';
import * as NotesController from '../controllers/notes';
const router = express.Router();
router.get('/', NotesController.getNotes);
router.get('/:noteId', NotesController.getnote);
router.patch('/:noteId', NotesController.updatenote);
router.post('/', NotesController.createNote);
router.delete('/:noteId', NotesController.deletNote);

export default router;
