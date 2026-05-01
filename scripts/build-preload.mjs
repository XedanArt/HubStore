import esbuild from "esbuild";

const ctx = await esbuild.context({
  entryPoints: ["src/preload/preload.ts"],
  outfile: "dist/preload.js",
  bundle: true,         // ← preload peut être bundlé
  platform: "node",
  format: "esm",
  external: ["electron"],
  sourcemap: true,
});

if (process.argv.includes("--watch")) {
  await ctx.watch();
  console.log("[preload] watching…");
} else {
  await ctx.rebuild();
  await ctx.dispose();
}
