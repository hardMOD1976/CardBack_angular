
export interface VariantAdminFigure {
  id: string;
  name: string;
  code?: string | null;
  imageUrl?: string | null;
  character: {
    id: string;
    name: string;
  };
  line: {
    id: string;
    name: string;
    manufacturer: {
      id: string;
      name: string;
    };
  };
}

export interface VariantAdminModel {
  id: string;
  name: string | null;
  description: string | null;
  imageUrl: string | null;
  figure: VariantAdminFigure;
}

export interface VariantAdminReference {
  id: string;
  name: string;
}

export interface VariantAdminPaginatedResponse {
  data: VariantAdminModel[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface VariantAdminReferenceResponse {
  data: VariantAdminReference[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface VariantAdminPayload {
  name: string | null;
  description: string | null;
  imageUrl: string | null;
  figureId: string;
}

export interface VariantAdminWriteResponse {
  id: string;
  name: string | null;
  description: string | null;
  imageUrl: string | null;
  figureId: string;
}
