/// <reference types="vite/client" />

interface ImportMetaEnv {
    // present in vitest contexts; declare as optional for build-time type safety
    readonly vitest?: unknown;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
    readonly vitest?: unknown;
}
