export interface ManufacturerAdminModel {
  id: string;
  name: string;
  country: string | null;
  foundedYear: number | null;
  dissolvedYear: number | null;
}

export interface ManufacturerAdminPaginatedResponse {
  data: ManufacturerAdminModel[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ManufacturerAdminPayload {
  name: string;
  country?: string | null;
  foundedYear?: number | null;
  dissolvedYear?: number | null;
}
