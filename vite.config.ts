import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const basePath = env.VITE_DEPLOY_ENV === 'experimental' 
    ? '/ai_hist_react/experimental/' 
    : '/ai_hist_react/'
  
  return {
    plugins: [react()],
    base: basePath,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      hmr: {
        port: 443,
      },
    },
  }
})