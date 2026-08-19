import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../../core/services/theme.service';

@Component({
  selector: 'cb-theme-switch',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      cb-button
      (click)="toggleTheme()"
      class="theme-switch"
      [attr.aria-label]="(themeService.theme() === 'light' ? 'Switch to dark mode' : 'Switch to light mode')"
    >
      @if (themeService.theme() === 'light') {
        <span class="icon">🌙</span>
      } @else {
        <span class="icon">☀️</span>
      }
    </button>
  `,
  styles: [`
    .theme-switch {
      background: transparent;
      border: none;
      padding: 8px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 20px;
      transition: background-color 0.2s;
      
      &:hover {
        background-color: var(--bg-tertiary);
      }
      
      .icon {
        display: inline-block;
        line-height: 1;
      }
    }
  `]
})
export class ThemeSwitchComponent {
  protected themeService = inject(ThemeService);

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}