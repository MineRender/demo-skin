import esbuild from "esbuild";
import {polyfillNode} from "esbuild-plugin-polyfill-node";
import process from "process";

const args = process.argv.slice(2);

const sharedConfig = {
    entryPoints: ["index.ts"],
    bundle: true,
    minify: true
};
const context = await esbuild.context({
    ...sharedConfig,
    platform: 'browser',
    outfile: "bundle.js",
    plugins: [
        polyfillNode({}),
    ],
});
if (args.includes("--watch")) {
    await context.watch();
} else if (args.includes("--serve")) {
    await context.serve({
        servedir: ".",
    })
} else {
    await context.rebuild();
}