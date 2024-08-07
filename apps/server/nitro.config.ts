// https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: './',
  output: {
    dir: '../../.output',
  },
  preset: 'node-cluster',
})
