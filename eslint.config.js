import unocss from '@unocss/eslint-config/flat'
import { defineConfig } from 'eslint-config-hyoban'

export default defineConfig({
  react: 'vite',
  restrictedSyntax: ['jsx', 'tsx'],
  strict: true,
}, {
  files: ['**/*.{ts,tsx}'],
  ...unocss,
}, {
  files: ['**/*.{ts,tsx}'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
  },
})
