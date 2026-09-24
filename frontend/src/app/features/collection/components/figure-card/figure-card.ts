import { Component, Input, inject, output } from '@angular/core';
import { Router } from '@angular/router';

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

  readonly removeOwnedFigure = output<string>();

  private readonly router = inject(Router);

  openRelease(): void {
    if (this.figure.productReleaseId) {
      void this.router.navigate(['/product-releases', this.figure.productReleaseId]);
    }
  }

  remove(): void {
    if (this.figure.ownedFigureId) this.removeOwnedFigure.emit(this.figure.ownedFigureId);
  }

}
