import { type Class } from "type-fest/source/basic";

export type Args = unknown[];
export type AssertErrorReturnType<ExpectedError extends ErrorClass, Result> =
  | readonly [Result, undefined]
  | readonly [undefined, ExpectedError];
export type ErrorClass = Class<Error>;
export type ES5Object = { __proto__: unknown };
