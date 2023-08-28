import { returnIfMatchedError } from "./returnIfMatchedError";
import { type Args, type AssertErrorReturnType, type ErrorClass } from "./utilTypes";

// AssertErrorsAsync Base

type AssertErrorsAsync = <ExpectedError extends ErrorClass, Result, Arguments extends Args>(
  expectedErrors: ExpectedError | Array<ExpectedError>,
  f: (...args: Arguments) => Promise<Result>
) => (...args: Arguments) => Promise<AssertErrorReturnType<ExpectedError, Result>>;

export const assertErrorsAsync: AssertErrorsAsync =
  (expectedErrors, f) =>
  async (...args) => {
    try {
      const result = await f(...args);
      return [result, undefined] as const;
    } catch (e) {
      return returnIfMatchedError(expectedErrors, e);
    }
  };

// AssertErrorsAsync Curried

type AssertErrorsCurryAsync = <ExpectedError extends ErrorClass>(
  expectedErrors: ExpectedError | Array<ExpectedError>
) => <Result, Arguments extends Args>(
  f: (...args: Arguments) => Promise<Result>
) => (...args: Arguments) => Promise<AssertErrorReturnType<ExpectedError, Result>>;

export const assertErrorsCurryAsync: AssertErrorsCurryAsync = (expectedError) => (f) =>
  assertErrorsAsync(expectedError, f);

// AssertErrorsAsync Once

type AssertErrorsOnceAsync = <
  ExpectedError extends ErrorClass,
  Result,
  Arguments extends unknown[],
>(
  expectedError: ExpectedError,
  f: (...args: Arguments) => Promise<Result>,
  ...args: Arguments
) => Promise<AssertErrorReturnType<ExpectedError, Result>>;

export const assertErrorsOnceAsync: AssertErrorsOnceAsync = (expectedError, f, ...args) =>
  assertErrorsAsync(expectedError, f)(...args);
