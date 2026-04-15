import { Component } from '@angular/core';
import { Note } from '../../models/note.model';
import { NoteService } from '../../services/note';
import { ActivatedRoute } from '@angular/router';
import { find } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-note-detail',
  imports: [CommonModule],
  templateUrl: './note-detail.html',
  styleUrl: './note-detail.scss',
})
export class NoteDetail {
  noteId!: number;
  note?: Note;

  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService
  ) {
    this.route.params.subscribe(params => {
      this.noteId = +params['id'];
      this.note = noteService.getNotes()().find(n => n.id == this.noteId);
    })
  }
}
