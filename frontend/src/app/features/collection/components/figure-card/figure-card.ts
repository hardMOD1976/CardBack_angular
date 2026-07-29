import { Component, Input } from '@angular/core';

import { FigureCardModel } from '../../models/figure-card.model';

@Component({
  selector: 'cb-figure-card',
  standalone: true,
  templateUrl: './figure-card.html',
  styleUrl: './figure-card.scss',
})
export class FigureCard {

  @Input({ required: true })
  figure!: FigureCardModel;

}