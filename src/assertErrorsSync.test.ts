import { assertErrors, assertErrorsCurry, assertErrorsOnce } from "./assertErrorsSync";
import { UnknownError } from "./UnknownError";

class MyError extends Error {}
class MyOtherError extends Error {}

const myError = new MyError("");
const myOtherError = new MyOtherError("");

describe("assertErrors", () => {
  function doesNotThrow() {
    return true;
  }

  function doesThrow() {
    throw myError;
  }

  function doesAlsoThrow() {
    throw myOtherError;
  }

  it("returns function result when no error occurs", () => {
    const nonThrowingAssertErrors = assertErrors(MyError, doesNotThrow);
    expect(nonThrowingAssertErrors).not.toThrow();

    const results = nonThrowingAssertErrors();
    expect(results.at(0)).toBeTruthy();
    expect(results.at(1)).toBeUndefined();
  });

  it("returns thrown error when function throws", () => {
    expect(doesThrow).toThrow();

    const throwingAssertErrors = assertErrors(MyError, doesThrow);
    expect(throwingAssertErrors).not.toThrow();

    const results = throwingAssertErrors();
    expect(results.at(0)).toBeUndefined();
    expect(results.at(1)).toEqual(myError);
  });

  it("returns thrown error that matches error array", () => {
    expect(doesAlsoThrow).toThrow();

    const throwingAssertErrors = assertErrors([MyError, MyOtherError], doesAlsoThrow);
    expect(throwingAssertErrors).not.toThrow();

    const results = throwingAssertErrors();
    expect(results.at(0)).toBeUndefined();
    expect(results.at(1)).toEqual(myOtherError);
  });

  it("throws unexpected error when errors mis match", () => {
    const throwingAssertErrors = assertErrors(MyError, doesAlsoThrow);
    expect(throwingAssertErrors).toThrow(UnknownError);
  });

  describe("assertErrorsCurry", () => {
    it("runs as a curried function", () => {
      const nonThrowingCurry = assertErrorsCurry(MyError)(doesNotThrow);

      const results = nonThrowingCurry();
      expect(results.at(0)).toBeTruthy();
      expect(results.at(1)).toBeUndefined();

      const throwingCurry = assertErrorsCurry(MyError)(doesThrow);

      const resultsThrow = throwingCurry();
      expect(resultsThrow.at(0)).toBeUndefined();
      expect(resultsThrow.at(1)).toEqual(myError);
    });
  });

  describe("assertErrorsOnce", () => {
    it("runs as a one-off function", () => {
      const results = assertErrorsOnce(MyError, doesNotThrow);
      expect(results.at(0)).toBeTruthy();
      expect(results.at(1)).toBeUndefined();

      const resultsThrow = assertErrorsOnce(MyError, doesThrow);
      expect(resultsThrow.at(0)).toBeUndefined();
      expect(resultsThrow.at(1)).toEqual(myError);
    });
  });
});
