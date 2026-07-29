import { Component, inject, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { CollectionService } from '../../services/collection.service';

import { FigureCard } from '../../components/figure-card/figure-card';

import { FigureCardModel } from '../../models/figure-card.model';

@Component({
  selector: 'app-collection',
  imports: [
    CommonModule,
    FigureCard,
  ],
  templateUrl: './collection.html',
  styleUrl: './collection.scss',
})
export class Collection implements OnInit {

  private readonly collectionService =
    inject(CollectionService);

  figures: FigureCardModel[] = [];

  ngOnInit(): void {

    this.collectionService.getMyCollection()
      .subscribe({

        next: response => {

          this.figures = response.map((ownedFigure: any) => ({

            id: ownedFigure.id,

            character: ownedFigure.figure.character.name,

            line: ownedFigure.figure.line.name,

            manufacturer: ownedFigure.figure.line.manufacturer.name,

            imageUrl: '',

            inCollection: true,

          }));

        },

        error: error => {

          console.error(error);

        },

      });

  }

}