import { contextBridge, ipcRenderer } from "electron";
import type {
  Franchise,
  Country,
  Site,
  Job,
  CreateFranchiseInput,
  CreateCountryInput,
  CreateSiteInput,
  CreateJobInput,
  ApiResponse,
  ApiListResponse,
} from "../types";

/**
 * API Database exposée au contexte renderer
 * Tous les types sont strictement typés avec TypeScript
 */
const databaseApi = {
  // ===== FRANCHISES =====
  franchises: {
    getAll: (): Promise<ApiListResponse<Franchise>> =>
      ipcRenderer.invoke("db:franchises:getAll"),

    getById: (id: number): Promise<ApiResponse<Franchise>> =>
      ipcRenderer.invoke("db:franchises:getById", id),

    create: (data: CreateFranchiseInput): Promise<ApiResponse<Franchise>> =>
      ipcRenderer.invoke("db:franchises:create", data),

    update: (
      id: number,
      data: Partial<CreateFranchiseInput>
    ): Promise<ApiResponse<Franchise>> =>
      ipcRenderer.invoke("db:franchises:update", { id, data }),

    delete: (id: number): Promise<ApiResponse<void>> =>
      ipcRenderer.invoke("db:franchises:delete", id),
  },

  // ===== COUNTRIES =====
  countries: {
    getAll: (): Promise<ApiListResponse<Country>> =>
      ipcRenderer.invoke("db:countries:getAll"),

    getByFranchiseId: (franchiseId: number): Promise<ApiListResponse<Country>> =>
      ipcRenderer.invoke("db:countries:getByFranchiseId", franchiseId),

    getById: (id: number): Promise<ApiResponse<Country>> =>
      ipcRenderer.invoke("db:countries:getById", id),

    create: (data: CreateCountryInput): Promise<ApiResponse<Country>> =>
      ipcRenderer.invoke("db:countries:create", data),

    update: (
      id: number,
      data: Partial<CreateCountryInput>
    ): Promise<ApiResponse<Country>> =>
      ipcRenderer.invoke("db:countries:update", { id, data }),

    delete: (id: number): Promise<ApiResponse<void>> =>
      ipcRenderer.invoke("db:countries:delete", id),
  },

  // ===== SITES =====
  sites: {
    getAll: (): Promise<ApiListResponse<Site>> =>
      ipcRenderer.invoke("db:sites:getAll"),

    getByCountryId: (countryId: number): Promise<ApiListResponse<Site>> =>
      ipcRenderer.invoke("db:sites:getByCountryId", countryId),

    getById: (id: number): Promise<ApiResponse<Site>> =>
      ipcRenderer.invoke("db:sites:getById", id),

    create: (data: CreateSiteInput): Promise<ApiResponse<Site>> =>
      ipcRenderer.invoke("db:sites:create", data),

    update: (
      id: number,
      data: Partial<CreateSiteInput>
    ): Promise<ApiResponse<Site>> =>
      ipcRenderer.invoke("db:sites:update", { id, data }),

    delete: (id: number): Promise<ApiResponse<void>> =>
      ipcRenderer.invoke("db:sites:delete", id),
  },

  // ===== JOBS =====
  jobs: {
    getAll: (): Promise<ApiListResponse<Job>> =>
      ipcRenderer.invoke("db:jobs:getAll"),

    getBySiteId: (siteId: number): Promise<ApiListResponse<Job>> =>
      ipcRenderer.invoke("db:jobs:getBySiteId", siteId),

    getById: (id: number): Promise<ApiResponse<Job>> =>
      ipcRenderer.invoke("db:jobs:getById", id),

    create: (data: CreateJobInput): Promise<ApiResponse<Job>> =>
      ipcRenderer.invoke("db:jobs:create", data),

    update: (
      id: number,
      data: Partial<CreateJobInput>
    ): Promise<ApiResponse<Job>> =>
      ipcRenderer.invoke("db:jobs:update", { id, data }),

    delete: (id: number): Promise<ApiResponse<void>> =>
      ipcRenderer.invoke("db:jobs:delete", id),
  },
};

/**
 * Type global pour TypeScript
 * Permet l'autocompletion dans les composants React
 */
export type DatabaseAPI = typeof databaseApi;

declare global {
  interface Window {
    db: DatabaseAPI;
  }
}

// Expose l'API de manière sécurisée
contextBridge.exposeInMainWorld("db", databaseApi);
