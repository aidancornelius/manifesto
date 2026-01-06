// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  site: 'https://manifesto.ursa.nz',
  integrations: [svelte()],
  image: {
    service: { entrypoint: 'astro/assets/services/noop' }
  }
});
