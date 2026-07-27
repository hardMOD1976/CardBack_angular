import { Component, input } from '@angular/core';

@Component({
  selector: 'cb-badge',
  imports: [],
  templateUrl: './badge.html',
  styleUrl: './badge.scss',
})
export class Badge {

  readonly variant = input<
    'primary' |
    'success' |
    'warning' |
    'danger' |
    'neutral'
  >('neutral');

}