const esbuild = require("esbuild");
const { nodeExternalsPlugin } = require("esbuild-node-externals");
esbuild
  .build({
    entryPoints: ["./src/index.ts"],
    outfile: "dist/index.js",
    bundle: true,
    minify: true,
    treeShaking: true,
    platform: "node",
    format: "cjs",
    target: "node14",
    plugins: [
      nodeExternalsPlugin(),
      {
        name: 'TypeScriptDeclarationsPlugin',
        setup(build) {
          build.onEnd((result) => {
            if (result.errors.length > 0) return
            execSync('tsc')
          })
        }
      }
    ],
  })
  .catch(() => process.exit(1));
