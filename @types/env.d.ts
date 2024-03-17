/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TASKWARD_BASE_URL: string
  readonly VITE_BRUCE_WORLD_BASE_URL: string
  readonly VITE_GITHUB_CLIENT_ID: string
  readonly VITE_VERSION: string
  readonly VITE_SHOW_REACT_QUERY_DEVTOOL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
