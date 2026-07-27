import { Component, input } from '@angular/core';

@Component({
  selector: 'cb-input',
  imports: [],
  templateUrl: './input.html',
  styleUrl: './input.scss',
})
export class Input {

  readonly type = input('text');

  readonly placeholder = input('');

}