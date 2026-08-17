import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'cb-collection-header',
  standalone: true,
  templateUrl: './cb-collection-header.html',
  styleUrl: './cb-collection-header.scss',
})
export class CollectionHeader {
  @Input({ required: true })
  totalFigures = 0;

  @Output()
  sortClicked = new EventEmitter<void>();

  @Output()
  filtersClicked = new EventEmitter<void>();
}