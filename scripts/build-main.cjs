const esbuild = require('esbuild')

async function build() {
  const ctx = await esbuild.context({
    entryPoints: ['src/main/index.ts'],
    outfile: 'dist/main.js',
    bundle: true,
    platform: 'node',
    format: 'esm',          // ← OBLIGATOIRE
    external: [
      'electron',
      '@prisma/client',
      '.prisma/client',
    ],
    sourcemap: true,
    minify: false,
  })

  if (process.argv.includes('--watch')) {
    await ctx.watch()
    console.log('[main] watching…')
  } else {
    await ctx.rebuild()
    await ctx.dispose()
  }
}

build()

