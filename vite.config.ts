import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import eslint from 'vite-plugin-eslint';

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
    plugins: [dts({ tsconfigPath: './tsconfig.app.json', rollupTypes: true }), eslint()],
    build: {
        lib: {
            entry: {
                index: resolve(__dirname, 'src/index.ts'),
                utils: resolve(__dirname, 'src/utils/index.ts'),
            },
            name: '@hatch/vue-store-actions',
            formats: ['es'],
        },
        rollupOptions: {
            external: ['vue'],
        },
    },
});
