import { UnknownError } from "./UnknownError";
import { returnIfMatchedError } from "./returnIfMatchedError";
import * as isExpectedError from "./isExpectedError";

class MyError extends Error {}
class MyOtherError extends Error {}

const myError = new MyError("");
const myOtherError = new MyOtherError("");

describe("returnIfMatchedError", () => {
  it("returns error if matches when passed", () => {
    const [result, err] = returnIfMatchedError(MyError, myError);
    expect(result).toBeUndefined();
    expect(err).toEqual(myError);
  });

  it("returns error if matches with one of many when passed", () => {
    const isExpectedErrorSpy = jest.spyOn(isExpectedError, "isExpectedError");

    const [result, err] = returnIfMatchedError([MyOtherError, MyError], myError);
    expect(result).toBeUndefined();
    expect(err).toEqual(myError);

    expect(isExpectedErrorSpy).toHaveBeenCalledTimes(2);
  });

  it("throws Unexpected Error if passed error does not match", () => {
    expect(() => returnIfMatchedError(MyError, myOtherError)).toThrow(UnknownError);
  });
});
