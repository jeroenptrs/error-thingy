import { UnknownError } from "./UnknownError";
import { isExpectedError } from "./isExpectedError";
import { type ErrorClass } from "./utilTypes";

export function returnIfMatchedError<ExpectedError extends ErrorClass>(
  expectedErrors: ExpectedError | Array<ExpectedError>,
  e: unknown
): readonly [undefined, ExpectedError] {
  if (Array.isArray(expectedErrors)) {
    for (const expectedError of expectedErrors) {
      if (isExpectedError(expectedError, e)) {
        return [undefined, e] as const;
      }
    }
  } else if (isExpectedError(expectedErrors, e)) {
    return [undefined, e] as const;
  }

  throw new UnknownError(e);
}
