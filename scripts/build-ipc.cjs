const esbuild = require("esbuild");

async function build() {
  const ctx = await esbuild.context({
    entryPoints: ["src/main/ipc/dbhandlers.ts"],
    outfile: "dist/ipc/dbhandlers.js",
    bundle: true,
    platform: "node",
    format: "esm",
    external: ["electron"],
    sourcemap: true,
  });

  if (process.argv.includes("--watch")) {
    await ctx.watch();
    console.log("[ipc] watching…");
  } else {
    await ctx.rebuild();
    await ctx.dispose();
  }
}

build();
