import unocss from '@unocss/eslint-config/flat'
import { defineConfig } from 'eslint-config-hyoban'

export default defineConfig({}, [
  {
    files: ['**/*.{ts,tsx}'],
    ...unocss,
  },
])
