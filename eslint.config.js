import unocss from '@unocss/eslint-config/flat'
import { defineConfig } from 'eslint-config-hyoban'

export default defineConfig({
  react: 'vite',
  restrictedSyntax: ['jsx', 'tsx'],
  strict: true,
}, {
  files: ['**/*.{ts,tsx}'],
  ...unocss,
})
