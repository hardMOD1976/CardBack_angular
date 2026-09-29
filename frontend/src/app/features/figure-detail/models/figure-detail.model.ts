export interface FigureDetailModel {
  id: string;
  name: string;
  code: string | null;
  description: string | null;
  imageUrl: string | null;

  character: {
    id: string;
    name: string;
    image: string | null;
  };

  line: {
    id: string;
    name: string;
    scale: string | null;
    logo: string | null;
  };

  variants: {
    id: string;
    name: string | null;
    description: string | null;
    imageUrl: string | null;
  }[];
}