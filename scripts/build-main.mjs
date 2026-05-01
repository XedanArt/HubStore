import esbuild from "esbuild";

const ctx = await esbuild.context({
  entryPoints: ["src/main/index.ts"],
  outfile: "dist/main.js",
  bundle: false,        // ← CRITIQUE : pas de bundle
  platform: "node",
  format: "esm",
  sourcemap: true,
  target: "node20",     // ← recommandé pour Electron 41
});

if (process.argv.includes("--watch")) {
  await ctx.watch();
  console.log("[main] watching…");
} else {
  await ctx.rebuild();
  await ctx.dispose();
}
