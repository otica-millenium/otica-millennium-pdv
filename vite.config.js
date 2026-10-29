import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({plugins:[react()],base:process.env.GITHUB_ACTIONS && process.env.PUBLISH_WEB==='true'?'/otica-millennium-pdv/':'/'});
