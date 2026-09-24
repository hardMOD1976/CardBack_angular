import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WishlistService } from '../../services/wishlist.service';
import { WishlistEntryModel } from '../../models/wishlist-entry.model';

@Component({ selector: 'app-wishlist', standalone: true, imports: [CommonModule, RouterLink], templateUrl: './wishlist.html', styleUrl: './wishlist.scss' })
export class Wishlist {
  private readonly service = inject(WishlistService); private readonly destroyRef = inject(DestroyRef);
  readonly entries = signal<WishlistEntryModel[]>([]); readonly loading = signal(true); readonly error = signal(false); readonly removing = signal<string | null>(null);
  ngOnInit(): void { this.load(); }
  load(): void {
    this.loading.set(true); this.error.set(false);
    this.service.getMine().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (entries) => { this.entries.set(entries); this.loading.set(false); },
      error: () => { this.error.set(true); this.loading.set(false); },
    });
  }
  remove(entry: WishlistEntryModel): void {
    this.removing.set(entry.id);
    this.service.remove(entry.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => { this.entries.update((current) => current.filter((item) => item.id !== entry.id)); this.removing.set(null); },
      error: () => { this.error.set(true); this.removing.set(null); },
    });
  }
}
