import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CollectionService } from '../../../collection/services/collection.service';
import { OwnedFigureModel } from '../../../collection/models/owned-figure.model';

@Component({ selector: 'app-dashboard', standalone: true, imports: [CommonModule, RouterLink], templateUrl: './dashboard.html', styleUrl: './dashboard.scss' })
export class Dashboard implements OnInit {
  private readonly collectionService = inject(CollectionService);
  readonly stats = signal<{ totalEntries: number; totalCopies: number; purchaseValue: number; estimatedValue: number; recent: OwnedFigureModel[] } | null>(null);
  readonly loading = signal(true); readonly error = signal(false);
  ngOnInit(): void { this.load(); }
  load(): void {
    this.loading.set(true); this.error.set(false);
    this.collectionService.getStats().subscribe({
      next: (stats) => { this.stats.set(stats); this.loading.set(false); },
      error: () => { this.error.set(true); this.loading.set(false); },
    });
  }
  get growthValue(): number { const s = this.stats(); return s ? s.estimatedValue - s.purchaseValue : 0; }
}
