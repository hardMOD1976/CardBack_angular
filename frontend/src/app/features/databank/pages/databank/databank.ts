import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatabankService } from '../../services/databank.service';

import { FigureCard } from '../../../collection/components/figure-card/figure-card';

import { FigureCardModel } from '../../../collection/models/figure-card.model';

@Component({
  selector: 'app-databank',
  standalone: true,
  imports: [
    CommonModule,
    FigureCard,
  ],
  templateUrl: './databank.html',
  styleUrl: './databank.scss',
})
export class Databank implements OnInit {

  private readonly databankService =
    inject(DatabankService);

  figures: FigureCardModel[] = [];

  loading = true;

  error = false;

  ngOnInit(): void {

    this.databankService
      .getProductReleases()
      .subscribe({

        next: response => {

  try {

    this.figures = response.data.map(release => ({

      id: release.id,

      character:
        release.variant.figure.character.name,

      line:
        release.variant.figure.line.name,

      manufacturer:
        release.variant.figure.line.manufacturer.name,

      imageUrl:
        release.imageUrl,

      inCollection: false,

      showStatus: false,

      releaseName:
        release.name,

      releaseYear:
        release.releaseYear,

      packagingType:
        release.packagingType,

    }));
    console.log(response.data[0])

  } catch (e) {

    console.error('MAP ERROR', e);

  }

  this.loading = false;

},

        error: error => {

          console.error(error);

          this.error = true;

          this.loading = false;

        },

      });

  }

}