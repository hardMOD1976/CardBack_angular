import { Component, Input } from '@angular/core';

@Component({
  selector: 'cb-collection-header',
  standalone: true,
  templateUrl: './cb-collection-header.html',
  styleUrl: './cb-collection-header.scss',
})
export class CollectionHeader {

  @Input({ required: true })
  totalFigures = 0;

}