import esbuild from "esbuild";

const ctx = await esbuild.context({
  entryPoints: [
    "src/main/ipc/dbhandlers.ts",
    "src/main/ipc/auth.ts"
  ],
  outdir: "dist/ipc",
  bundle: true,
  platform: "node",
  format: "esm",
  external: ["electron", "@prisma/client", "bcryptjs"],
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
