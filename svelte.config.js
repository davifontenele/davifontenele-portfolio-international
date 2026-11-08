import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
export default {
  preprocess: vitePreprocess(),
  kit: {
    // Os bundles CSS atuais são pequenos; inline evita duas requisições render-blocking.
    inlineStyleThreshold: 20_000,
    // Estático: cada idioma × rota é pré-renderizado. `404.html` é servido pelo
    // Vercel com status 404 real para URLs desconhecidas (sem rewrite global).
    adapter: adapter({ fallback: '404.html' }),
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
