export interface FigureCardModel {

  id: string;

  character: string;

  line: string;

  manufacturer: string;

  imageUrl: string | null;

  inCollection: boolean;

  releaseName?: string;

  releaseYear?: number | null;

  packagingType?: string | null;

  showStatus?: boolean;

}