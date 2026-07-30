import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectionService } from '../../services/collection.service';

import { FigureCard } from '../../components/figure-card/figure-card';
import { FigureCardModel } from '../../models/figure-card.model';

import { CollectionHeader } from '../../components/cb-collection-header/cb-collection-header';

@Component({
  selector: 'app-collection',
  imports: [
    CommonModule,
    FigureCard,
    CollectionHeader,
  ],
  templateUrl: './collection.html',
  styleUrl: './collection.scss',
})
export class Collection implements OnInit {

  private readonly collectionService =
    inject(CollectionService);

  figures: FigureCardModel[] = [];

  loading = true;

  error = false;

  ngOnInit(): void {

    this.collectionService.getMyCollection()
      .subscribe({

        next: response => {

          this.figures = response.data.map((ownedFigure: any) => ({

  id: ownedFigure.id,

  character:
    ownedFigure.productRelease.variant.figure.character.name,

  line:
    ownedFigure.productRelease.variant.figure.line.name,

  manufacturer:
    ownedFigure.productRelease.variant.figure.line.manufacturer.name,

  imageUrl:
    ownedFigure.productRelease.imageUrl,

  inCollection: true,

  showStatus: true,

  releaseName:
    ownedFigure.productRelease.name,

  releaseYear:
    ownedFigure.productRelease.releaseDate
      ? new Date(
          ownedFigure.productRelease.releaseDate,
        ).getFullYear()
      : null,

  packagingType:
    ownedFigure.productRelease.packagingType,

}));

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