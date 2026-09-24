import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

export interface FigureIdentificationMatch {
  figureName: string; characterName: string; lineName: string; manufacturer: string;
  approximateYear: number | null; confidence: number; reasoning: string;
}
export interface FigureIdentificationResponse { matches: FigureIdentificationMatch[]; disclaimer: string; }

@Injectable({ providedIn: 'root' })
export class AiIdentifyService {
  private readonly http = inject(HttpClient);
  identify(imageBase64: string, mimeType: string) {
    return this.http.post<FigureIdentificationResponse>(`${environment.apiUrl}/ai/identify-figure`, { imageBase64, mimeType });
  }
}
