import { Component, input } from '@angular/core';

@Component({
  selector: 'cb-avatar',
  imports: [],
  templateUrl: './avatar.html',
  styleUrl: './avatar.scss',
})
export class Avatar {

  readonly initials = input('C');

}