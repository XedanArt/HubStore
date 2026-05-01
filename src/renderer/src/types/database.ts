// Types pour l'API de la base de données
export type Franchise = {
  id: number;
  name: string;
  countries?: Country[];
};

export type Country = {
  id: number;
  name: string;
  franchiseId: number;
  franchise?: Franchise;
  sites?: Site[];
};

export type Site = {
  id: number;
  name: string;
  address?: string | null;
  countryId: number;
  country?: Country;
  jobs?: Job[];
};

export type Job = {
  id: number;
  title: string;
  date: Date;
  siteId: number;
  site?: Site;
  notes?: string | null;
};

// Types pour les inputs de création
export type CreateFranchiseInput = {
  name: string;
};

export type CreateCountryInput = {
  name: string;
  franchiseId: number;
};

export type CreateSiteInput = {
  name: string;
  address?: string;
  countryId: number;
};

export type CreateJobInput = {
  title: string;
  siteId: number;
  notes?: string;
};

// Types génériques pour les réponses
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export type ApiListResponse<T> = {
  success: boolean;
  data: T[];
  count: number;
  error?: string;
};
