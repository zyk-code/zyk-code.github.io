import tailwindcss from '@tailwindcss/postcss';
import vinext from 'vinext';
import { defineConfig } from 'vite';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
export default defineConfig({
  css: { postcss: { plugins: [tailwindcss()] } },
  plugins: [
    vinext(),
    {
      name: 'refresh-notes',
      configureServer(server) {
        server.watcher.on('all', (event, file) => {
          const relative = path
            .relative(server.config.root, file)
            .split(path.sep)
            .join('/');
          if (
            !['add', 'change', 'unlink'].includes(event) ||
            relative.startsWith('../')
          )
            return;
          if (
            !/^(C\+\+|计算机|深度学习|其他)\/.*\.md$/.test(relative) &&
            !['data/catalog.json', 'data/topics.json'].includes(relative)
          )
            return;
          try {
            execFileSync(process.execPath, ['scripts/build-content.mjs'], {
              cwd: server.config.root,
              stdio: 'pipe',
            });
          } catch (error) {
            server.config.logger.error(
              error instanceof Error ? error.message : String(error),
            );
          }
        });
      },
    },
  ],
});
