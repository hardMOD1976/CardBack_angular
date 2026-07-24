import { Component, signal } from '@angular/core';
import { Shell } from "./shell/components/shell/shell";

@Component({
  selector: 'app-root',
  imports: [Shell],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');
}
