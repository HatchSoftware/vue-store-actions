import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'Vue Store Actions',
    description:
        'Documentation for the Vue Store Actions plugin, making managing the state of store actions easier.',
    base: '/vue-store-actions/',
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Getting started', link: '/getting-started' },
            { text: 'Guide', link: '/guide/integrate' },
        ],

        sidebar: [
            {
                text: 'Introduction',
                items: [
                    { text: 'What is this?', link: '/introduction' },
                    { text: 'Getting started', link: '/getting-started' },
                ],
            },
            {
                text: 'Guide',
                items: [
                    { text: 'Integrate with Pinia', link: '/guide/integrate' },
                    { text: 'Creating actions', link: '/guide/creating-actions' },
                    { text: 'Usage in components', link: '/guide/usage-in-components' },
                    { text: 'Handling action results', link: '/guide/action-results' },
                    { text: 'Generic error handling', link: '/guide/generic-error-handling' },
                ],
            },
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/HatchSoftware/vue-store-actions' },
        ],

        search: {
            provider: 'local',
        },
    },
});
