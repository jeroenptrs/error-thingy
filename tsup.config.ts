import { type Options } from "tsup";

// Set true if needed for library
const splitting = true;

export const tsup: Options = {
  format: ["cjs", "esm"],
  splitting,
  bundle: false,
  entry: splitting ? ["src/**/*[^.test].ts"] : ["src/index.ts"],
  clean: true,
  dts: true,
  target: "esnext",
  tsconfig: "./tsconfig.prod.json",
  skipNodeModulesBundle: true,
  outDir: "dist",
};
