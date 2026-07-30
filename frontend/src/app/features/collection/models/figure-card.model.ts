export interface FigureCardModel {

  id: string;

  character: string;

  line: string;

  manufacturer: string;

  imageUrl?: string | null;

  inCollection: boolean;

  condition?: string;

  carded?: boolean;

}