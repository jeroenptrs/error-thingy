import { ErrorClass } from "./utilTypes";

export function isExpectedError<ExpectedError extends ErrorClass>(
  expectedError: ExpectedError,
  error: unknown
): error is ExpectedError {
  return error instanceof expectedError;
}
