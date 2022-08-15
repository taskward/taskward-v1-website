/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TASKWARD_BASE_URL: string;
  readonly VITE_BRUCE_WORLD_BASE_URL: string;
  readonly VITE_BRUCE_WORLD_API_BASE_URL: string;
  readonly VITE_GITHUB_CLIENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
