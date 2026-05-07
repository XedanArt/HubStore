import esbuild from "esbuild";

const ctx = await esbuild.context({
  entryPoints: ["src/main/index.ts"],
  outfile: "dist/main.js",
  bundle: true, // ✅ IMPORTANT
  platform: "node",
  format: "esm",
  target: "node20",
  external: [
    "electron",
    "@prisma/client",
    "bcryptjs"
  ],
  sourcemap: false
});

if (process.argv.includes("--watch")) {
  await ctx.watch();
  console.log("[main] watching…");
} else {
  await ctx.rebuild();
  await ctx.dispose();
}