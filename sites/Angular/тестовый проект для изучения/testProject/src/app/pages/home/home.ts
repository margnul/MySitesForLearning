import { Component, signal, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Note } from '../../models/note.model';
import { CommonModule, } from '@angular/common';
import { RouterLink } from "@angular/router";
import { RouterModule } from '@angular/router';
import { NoteAdd } from '../../components/note-add/note-add';
import { NoteService } from '../../services/note';


@Component({
  selector: 'app-home',
  imports: [ CommonModule, RouterLink, RouterModule, NoteAdd],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  @Input() userName!: string;

  constructor(private noteService: NoteService) { }

  userNameFooterChanged(username: string) {
    this.userName = username;
  }

  showAlert() {
    alert('title clicked');
  }

  protected get notes() {
    return this.noteService.getNotes();
  }
}
