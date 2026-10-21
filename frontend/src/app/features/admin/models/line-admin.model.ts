export interface LineAdminReference {
  id: string;
  name: string;
}

export interface LineAdminModel {
  id: string;
  name: string;
  startYear: number | null;
  endYear: number | null;
  scale: string | null;
  logo: string | null;
  description: string | null;
  manufacturer: LineAdminReference;
  franchise: LineAdminReference & { logo?: string | null };
}

export interface LineAdminPaginatedResponse {
  data: LineAdminModel[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface LineAdminPayload {
  name: string;
  startYear?: number | null;
  endYear?: number | null;
  scale?: string | null;
  logo?: string | null;
  description?: string | null;
  manufacturerId: string;
  franchiseId: string;
}

export interface LineAdminWriteResponse {
  id: string;
  name: string;
  startYear: number | null;
  endYear: number | null;
  scale: string | null;
  logo: string | null;
  description: string | null;
  manufacturerId: string;
  franchiseId: string;
}

export interface LineAdminReferenceResponse {
  data: LineAdminReference[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
