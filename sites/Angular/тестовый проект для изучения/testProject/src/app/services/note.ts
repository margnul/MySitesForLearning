import { Injectable, signal } from '@angular/core';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private notes = signal<Note[]>([
    { id: 1, title: 'Заметка 1', content: 'Попробовать пописать стоя', createdAt: new Date() },
    { id: 2, title: 'Заметка 2', content: 'Я пережил нечто ужасное...', createdAt: new Date() }
  ])

  getNotes() {
    return this.notes;
  }

  addNote(title:string, content:string) {
    const newNote: Note = {
      id: Date.now(),
      title: title,
      content: content,
      createdAt: new Date()
    }

    this.notes.update(notes => [...notes, newNote]);
  }

}
