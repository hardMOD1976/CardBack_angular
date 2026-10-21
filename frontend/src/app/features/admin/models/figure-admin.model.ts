
export interface FigureAdminCharacter {
  id: string;
  name: string;
  image?: string | null;
}

export interface FigureAdminLine {
  id: string;
  name: string;
  scale?: string | null;
}

export interface FigureAdminModel {
  id: string;
  name: string;
  code?: string | null;
  description?: string | null;
  imageUrl?: string | null;
  character: FigureAdminCharacter;
  line: FigureAdminLine;
}

export interface FigureAdminReference {
  id: string;
  name: string;
}

export interface FigureAdminPaginatedResponse {
  data: FigureAdminModel[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface FigureAdminReferenceResponse {
  data: FigureAdminReference[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface FigureAdminPayload {
  name: string;
  code: string | null;
  description: string | null;
  imageUrl: string | null;
  characterId: string;
  lineId: string;
}

export interface FigureAdminWriteResponse {
  id: string;
  name: string;
  code?: string | null;
  description?: string | null;
  imageUrl?: string | null;
  characterId: string;
  lineId: string;
}
