import esbuild from "esbuild";

const ctx = await esbuild.context({
  entryPoints: ["src/main/index.ts"],
  outfile: "dist/main.js",
  bundle: true,
  platform: "node",
  format: "esm",
  target: "node20",
  external: ["electron", "@prisma/client", "bcryptjs"],
  sourcemap: true,
  banner: {
    js: `import { createRequire } from 'module'; const require = createRequire(import.meta.url);`
  }
});

if (process.argv.includes("--watch")) {
  await ctx.rebuild(); 
  await ctx.watch();
  console.log("[main] watching…");
} else {
  await ctx.rebuild();
  await ctx.dispose();
}
