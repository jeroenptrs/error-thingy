import { type Options } from "tsup";

// Set true if needed for library
const splitting = false;

export const tsup: Options = {
  format: ["esm"],
  splitting,
  bundle: true,
  entry: splitting ? ["src/**/*[^.test].ts"] : ["src/index.ts"],
  clean: true,
  dts: true,
  target: "esnext",
  tsconfig: "./tsconfig.prod.json",
  skipNodeModulesBundle: true,
  outDir: "dist",
};
