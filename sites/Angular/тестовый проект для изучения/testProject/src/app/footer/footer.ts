import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, FormsModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  @Output() subscribeClicked = new EventEmitter<void>();
  @Output() userNameChanged = new EventEmitter<string>();

  onSubscribe() {
    this.subscribeClicked.emit();
  }

  username: string = ''
}
