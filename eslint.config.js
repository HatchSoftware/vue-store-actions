import tseslint from 'typescript-eslint';
import eslint from '@eslint/js';
import eslintPrettier from 'eslint-plugin-prettier/recommended';
import pluginVue from 'eslint-plugin-vue';

export default [
    ...tseslint.config(
        {
            name: 'app/files-to-lint',
            files: ['**/*.{ts}'],
        },
        {
            name: 'app/files-to-ignore',
            ignores: ['**/dist/**'],
        },
        eslint.configs.recommended,
        tseslint.configs.recommended,
        ...pluginVue.configs['flat/recommended'],
    ),
    eslintPrettier,
];
