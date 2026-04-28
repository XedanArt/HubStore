export interface API {
  ping: () => string;
}

declare global {
  interface Window {
    api: API;
  }
}
