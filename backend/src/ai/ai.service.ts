import { Injectable, ServiceUnavailableException, BadGatewayException, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IdentifyFigureDto } from './dto/identify-figure.dto';

@Injectable()
export class AiService {
  constructor(private readonly config: ConfigService) {}

  async identifyFigure(dto: IdentifyFigureDto) {
    const apiKey = this.config.get<string>('GEMINI_API_KEY');
    if (!apiKey) throw new ServiceUnavailableException('AI identification is not configured.');
    if (!dto.imageBase64 || !/^[A-Za-z0-9+/]+={0,2}$/.test(dto.imageBase64)) {
      throw new BadRequestException('The uploaded image is invalid.');
    }
    const model = this.config.get<string>('GEMINI_MODEL') || 'gemini-3.8-flash';
    let response: Response;
    try {
      response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
        method: 'POST',
        headers: { 'x-goog-api-key': apiKey, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [
            { text: 'Identify likely commercially released action figures visible in this image. Return JSON only with an array named matches. Each match must have figureName, characterName, lineName, manufacturer, approximateYear (number or null), confidence (0-100), and reasoning. Do not claim authenticity or certainty; do not invent a catalog ID. If none are recognizable, return an empty array.' },
            { inline_data: { mime_type: dto.mimeType, data: dto.imageBase64 } },
          ] }],
          generationConfig: { responseMimeType: 'application/json', temperature: 0.2 },
        }),
      });
    } catch {
      throw new BadGatewayException('The AI identification service could not be reached.');
    }
    if (!response.ok) {
      if (response.status === 429) throw new ServiceUnavailableException('The AI service is busy. Please try again later.');
      throw new BadGatewayException('The AI identification service returned an error.');
    }
    const payload = await response.json() as { candidates?: { content?: { parts?: { text?: string }[] } }[] };
    const text = payload.candidates?.[0]?.content?.parts?.find((part) => part.text)?.text;
    if (!text) return { matches: [], disclaimer: 'AI suggestions may be inaccurate. Verify every detail against the catalogue.' };
    try {
      const parsed = JSON.parse(text) as { matches?: unknown };
      const matches = Array.isArray(parsed.matches) ? parsed.matches.slice(0, 5) : [];
      return { matches, disclaimer: 'AI suggestions may be inaccurate. They are not verified catalogue records.' };
    } catch {
      throw new BadGatewayException('The AI service returned a response that could not be read.');
    }
  }
}
