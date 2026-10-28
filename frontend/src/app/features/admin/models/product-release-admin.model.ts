
export interface ProductReleaseAdminManufacturer {
  id: string;
  name: string;
}

export interface ProductReleaseAdminLine {
  id: string;
  name: string;
  manufacturer: ProductReleaseAdminManufacturer;
}

export interface ProductReleaseAdminCharacter {
  id: string;
  name: string;
  image?: string | null;
}

export interface ProductReleaseAdminFigure {
  id: string;
  name: string;
  code: string | null;
  imageUrl: string | null;
  character: ProductReleaseAdminCharacter;
  line: ProductReleaseAdminLine;
}

export interface ProductReleaseAdminVariant {
  id: string;
  name: string | null;
  figure: ProductReleaseAdminFigure;
}

export interface ProductReleaseAdminModel {
  id: string;
  name: string;
  barcode: string | null;
  releaseYear: number | null;
  releaseDate: string | null;
  packagingType: string | null;
  region: string | null;
  language: string | null;
  retailer: string | null;
  notes: string | null;
  imageUrl: string | null;
  variant: ProductReleaseAdminVariant;
}

export interface ProductReleaseAdminReference {
  id: string;
  name: string | null;
  figure: ProductReleaseAdminFigure;
}

export interface ProductReleaseAdminPaginatedResponse {
  data: ProductReleaseAdminModel[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ProductReleaseAdminReferenceResponse {
  data: ProductReleaseAdminReference[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ProductReleaseAdminPayload {
  name: string;
  barcode: string | null;
  releaseDate: string | null;
  packagingType: string | null;
  region: string | null;
  language: string | null;
  retailer: string | null;
  notes: string | null;
  imageUrl: string | null;
  variantId: string;
}
