import { Component, inject, OnInit } from '@angular/core';
import { CollectionService } from '../../../collection/services/collection.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {

  private readonly collectionService =
    inject(CollectionService);

  ngOnInit(): void {

    this.collectionService.getMyCollection()
      .subscribe({

        next: response => {

          console.log(response);

        },

        error: error => {

          console.error(error);

        },

      });

  }

}
