import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { NoteService } from './services/note';

@Component({
  selector: 'app-root',
  imports: [ Header, Footer, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  handleSubscribe() {
    console.log('everythig works!');
    alert('LooooooooooooL');
  }

  title: string = 'Hello World on my website'
}
