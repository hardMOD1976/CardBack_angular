import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'cardback-theme';
  private readonly themeSignal = signal<Theme>('light');
  
  // Exposar el theme com a signal readonly
  public readonly theme = this.themeSignal.asReadonly();

  constructor() {
    // Carregar tema guardat o sistema
    this.loadTheme();
    
    // Aplicar tema inicial
    this.applyTheme(this.themeSignal());
    
    // Efecte per aplicar canvis automàticament
    effect(() => {
      const currentTheme = this.themeSignal();
      this.applyTheme(currentTheme);
      this.saveTheme(currentTheme);
    });
  }

  toggleTheme(): void {
    const current = this.themeSignal();
    const newTheme = current === 'light' ? 'dark' : 'light';
    this.themeSignal.set(newTheme);
  }

  setTheme(theme: Theme): void {
    this.themeSignal.set(theme);
  }

  private loadTheme(): void {
    // 1. Comprovar localStorage
    const saved = localStorage.getItem(this.THEME_KEY) as Theme | null;
    if (saved && (saved === 'light' || saved === 'dark')) {
      this.themeSignal.set(saved);
      return;
    }

    // 2. Comprovar preferència del sistema
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.themeSignal.set('dark');
      return;
    }

    // 3. Default: light
    this.themeSignal.set('light');
  }

  private saveTheme(theme: Theme): void {
    localStorage.setItem(this.THEME_KEY, theme);
  }

  private applyTheme(theme: Theme): void {
    const htmlElement = document.documentElement;
    if (theme === 'dark') {
      htmlElement.setAttribute('data-theme', 'dark');
    } else {
      htmlElement.removeAttribute('data-theme');
    }
  }
}