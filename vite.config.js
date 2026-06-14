import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 커스텀 도메인(rest03.dreamitbiz.com)은 루트로 서빙 → base는 '/'
export default defineConfig({
  plugins: [react()],
  base: '/',
})
