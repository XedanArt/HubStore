const esbuild = require('esbuild')

async function build() {
  const ctx = await esbuild.context({
    entryPoints: ['src/preload/preload.ts'],   // ← ICI
    outfile: 'dist/preload.js',
    bundle: true,
    platform: 'node',
    format: 'esm',
    external: ['electron'],
    sourcemap: true,
    minify: false,
  })

  if (process.argv.includes('--watch')) {
    await ctx.watch()
    console.log('[preload] watching…')
  } else {
    await ctx.rebuild()
    await ctx.dispose()
  }
}

build()
