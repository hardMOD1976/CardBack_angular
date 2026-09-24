import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, ViewChild, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { DatabankService } from '../../../databank/services/databank.service';
import { ProductReleaseModel } from '../../../databank/models/product-release.model';

type DetectorResult = { rawValue: string };
type Detector = { detect(source: HTMLVideoElement | ImageBitmap): Promise<DetectorResult[]> };
type DetectorConstructor = new (options?: { formats?: string[] }) => Detector;

@Component({
  selector: 'app-scan', standalone: true, imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './scan.html', styleUrl: './scan.scss',
})
export class Scan implements OnDestroy {
  private readonly databank = inject(DatabankService);
  @ViewChild('video') private video?: ElementRef<HTMLVideoElement>;
  @ViewChild('cameraCanvas') private cameraCanvas?: ElementRef<HTMLCanvasElement>;
  readonly barcode = signal(''); readonly scanning = signal(false); readonly loading = signal(false);
  readonly error = signal(''); readonly results = signal<ProductReleaseModel[]>([]);
  readonly cameraAvailable = typeof navigator !== 'undefined' && !!navigator.mediaDevices?.getUserMedia;
  private stream?: MediaStream; private animationFrame = 0; private lastScanned = '';
  private readonly detector: Detector | null = this.createDetector();

  private createDetector(): Detector | null {
    const Ctor = (globalThis as typeof globalThis & { BarcodeDetector?: DetectorConstructor }).BarcodeDetector;
    if (!Ctor) return null;
    try { return new Ctor({ formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e', 'code_128', 'code_39', 'itf'] }); }
    catch { return new Ctor(); }
  }

  async startCamera(): Promise<void> {
    this.error.set('');
    if (!this.detector) { this.error.set('Live barcode scanning is not supported by this browser. Enter the barcode manually or upload a barcode image.'); return; }
    if (!this.cameraAvailable) { this.error.set('Camera access is not available. Enter the barcode manually or upload an image.'); return; }
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' } }, audio: false });
      this.scanning.set(true);
      // The view is conditionally rendered; wait one frame so its video element exists.
      requestAnimationFrame(() => {
        const video = this.video?.nativeElement;
        if (!video || !this.stream) { this.stopCamera(); return; }
        video.srcObject = this.stream; void video.play().then(() => this.scanFrame());
      });
    } catch (e) {
      this.stopCamera(); this.error.set(e instanceof DOMException && e.name === 'NotAllowedError' ? 'Camera permission was denied. Enter the barcode manually or upload an image.' : 'Could not start the camera. Check that it is not being used by another app.');
    }
  }

  private scanFrame(): void {
    const video = this.video?.nativeElement;
    if (!this.scanning() || !video || !this.detector) return;
    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      void this.detector.detect(video).then(codes => {
        const value = codes[0]?.rawValue?.trim();
        if (value && value !== this.lastScanned) { this.lastScanned = value; this.barcode.set(value); this.stopCamera(); this.lookup(value); }
      }).catch(() => undefined).finally(() => { if (this.scanning()) this.animationFrame = requestAnimationFrame(() => this.scanFrame()); });
    } else this.animationFrame = requestAnimationFrame(() => this.scanFrame());
  }

  stopCamera(): void {
    this.scanning.set(false); cancelAnimationFrame(this.animationFrame);
    this.stream?.getTracks().forEach(track => track.stop()); this.stream = undefined;
    if (this.video?.nativeElement) this.video.nativeElement.srcObject = null;
  }

  lookup(value = this.barcode()): void {
    const code = value.trim(); if (!code) { this.error.set('Enter or scan a barcode first.'); return; }
    this.barcode.set(code); this.error.set(''); this.loading.set(true); this.results.set([]);
    this.databank.getProductReleases(1, 20, code).pipe(finalize(() => this.loading.set(false))).subscribe({
      next: page => {
        const exact = page.data.filter(item => item.barcode?.replace(/\s/g, '').toLowerCase() === code.replace(/\s/g, '').toLowerCase());
        this.results.set(exact.length ? exact : page.data);
        if (!page.data.length) this.error.set('No matching release was found in the catalogue. You can add the item to the catalogue from the databank.');
      },
      error: () => this.error.set('Could not search the catalogue. Please try again.'),
    });
  }

  async scanImage(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement; const file = input.files?.[0]; input.value = '';
    if (!file) return;
    if (!this.detector) { this.error.set('Barcode image scanning is not supported by this browser. Enter the barcode manually.'); return; }
    try {
      const bitmap = await createImageBitmap(file); const codes = await this.detector.detect(bitmap); bitmap.close();
      const value = codes[0]?.rawValue?.trim();
      if (!value) { this.error.set('No barcode was detected in that image. Try a sharper, well-lit photo.'); return; }
      this.barcode.set(value); this.lookup(value);
    } catch { this.error.set('Could not read that image. Try a JPG or PNG photo.'); }
  }

  ngOnDestroy(): void { this.stopCamera(); }
}
