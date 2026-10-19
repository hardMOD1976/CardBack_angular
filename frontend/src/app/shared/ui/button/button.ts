import { Component, input } from '@angular/core';

@Component({
  selector: 'cb-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly disabled = input(false);
}
