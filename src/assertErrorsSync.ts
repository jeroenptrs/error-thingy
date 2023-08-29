import { returnIfMatchedError } from "./returnIfMatchedError";
import { type Args, type AssertErrorReturnType, type ErrorClass } from "./utilTypes";

// AssertErrors Base

type AssertErrors = <ExpectedError extends ErrorClass, Result, Arguments extends Args>(
  expectedErrors: ExpectedError | Array<ExpectedError>,
  f: (...args: Arguments) => Result
) => (...args: Arguments) => AssertErrorReturnType<ExpectedError, Result>;

export const assertErrors: AssertErrors =
  (expectedErrors, f) =>
  (...args) => {
    try {
      const result = f(...args);
      return [result, undefined] as const;
    } catch (e) {
      return returnIfMatchedError(expectedErrors, e);
    }
  };

// AssertErrors Curried

type AssertErrorsCurry = <ExpectedError extends ErrorClass>(
  expectedErrors: ExpectedError | Array<ExpectedError>
) => <Result, Arguments extends Args>(
  f: (...args: Arguments) => Result
) => (...args: Arguments) => AssertErrorReturnType<ExpectedError, Result>;

export const assertErrorsCurry: AssertErrorsCurry = (expectedError) => (f) =>
  assertErrors(expectedError, f);

// AssertErrors Once

type AssertErrorsOnce = <ExpectedError extends ErrorClass, Result, Arguments extends unknown[]>(
  expectedError: ExpectedError,
  f: (...args: Arguments) => Result,
  ...args: Arguments
) => AssertErrorReturnType<ExpectedError, Result>;

export const assertErrorsOnce: AssertErrorsOnce = (expectedError, f, ...args) =>
  assertErrors(expectedError, f)(...args);
