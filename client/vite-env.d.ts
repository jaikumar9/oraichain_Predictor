/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_MNEMONIC: string;
    VITE_RPC: string;
    [key: string]: any;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
