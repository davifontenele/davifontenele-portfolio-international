import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
export default {
  preprocess: vitePreprocess(),
  kit: {
    // Os bundles CSS atuais são pequenos; inline evita duas requisições render-blocking.
    inlineStyleThreshold: 20_000,
    // SPA/estático: o site inteiro é uma única página imersiva.
    adapter: adapter({ fallback: '200.html' }),
    prerender: {
      // Enquanto os vídeos/posters reais não existirem em /static,
      // o build não deve quebrar por causa dos placeholders 404.
      handleHttpError: ({ path, message }) => {
        if (path.startsWith('/videos/') || path.startsWith('/posters/')) return;
        throw new Error(message);
      }
    }
  }
};
