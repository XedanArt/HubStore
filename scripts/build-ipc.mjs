import esbuild from "esbuild";

const ctx = await esbuild.context({
  entryPoints: ["src/main/ipc/dbhandlers.ts"],
  outfile: "dist/ipc/dbhandlers.js",
  bundle: true,
  platform: "node",
  format: "esm",
  external: ["electron", "@prisma/client", "prisma"],
  sourcemap: true,
  target: "node20"
});

if (process.argv.includes("--watch")) {
  await ctx.watch();
  console.log("[ipc] watching…");
} else {
  await ctx.rebuild();
  await ctx.dispose();
}