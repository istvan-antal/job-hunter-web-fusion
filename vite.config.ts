import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.');
    return {
        plugins: [react()],
        server: {
            port: parseInt(env.VITE__PORT),
            proxy: {
                '/api': 'http://localhost:14001/',
            },
        },
    };
});
