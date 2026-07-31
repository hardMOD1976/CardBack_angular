import {
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';

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

  readonly figures =
    signal<FigureCardModel[]>([]);

  readonly loading =
    signal(true);

  readonly error =
    signal(false);

  ngOnInit(): void {

    this.databankService
      .getProductReleases()
      .subscribe({

        next: response => {

          const figures = response.data.map(release => ({

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

          this.figures.set(figures);

          this.loading.set(false);

        },

        error: error => {

          console.error(error);

          this.error.set(true);

          this.loading.set(false);

        },

      });

  }

}