import {
  assertErrorsAsync,
  assertErrorsCurryAsync,
  assertErrorsOnceAsync,
} from "./assertErrorsAsync";
import { UnknownError } from "./UnknownError";

class MyError extends Error {}
class MyOtherError extends Error {}

const myError = new MyError("");
const myOtherError = new MyOtherError("");

describe("assertErrorsAsync", () => {
  async function doesNotThrow() {
    return true;
  }

  async function doesThrow() {
    throw myError;
  }

  async function doesAlsoThrow() {
    throw myOtherError;
  }

  it("returns function result when no error occurs", async () => {
    const nonThrowingAssertErrors = assertErrorsAsync(MyError, doesNotThrow);

    const results = await nonThrowingAssertErrors();
    expect(results.at(0)).toBeTruthy();
    expect(results.at(1)).toBeUndefined();
  });

  it("returns thrown error when function throws", async () => {
    const throwingAssertErrors = assertErrorsAsync(MyError, doesThrow);

    const results = await throwingAssertErrors();
    expect(results.at(0)).toBeUndefined();
    expect(results.at(1)).toEqual(myError);
  });

  it("returns thrown error that matches error array", async () => {
    const throwingAssertErrors = assertErrorsAsync([MyError, MyOtherError], doesAlsoThrow);

    const results = await throwingAssertErrors();
    expect(results.at(0)).toBeUndefined();
    expect(results.at(1)).toEqual(myOtherError);
  });

  it("throws unexpected error when errors mis match", async () => {
    const throwingAssertErrors = assertErrorsAsync(MyError, doesAlsoThrow);
    await expect(throwingAssertErrors()).rejects.toBeInstanceOf(UnknownError);
  });

  describe("assertErrorsCurryAsync", () => {
    it("runs as a curried function", async () => {
      const nonThrowingCurry = assertErrorsCurryAsync(MyError)(doesNotThrow);

      const results = await nonThrowingCurry();
      expect(results.at(0)).toBeTruthy();
      expect(results.at(1)).toBeUndefined();

      const throwingCurry = assertErrorsCurryAsync(MyError)(doesThrow);

      const resultsThrow = await throwingCurry();
      expect(resultsThrow.at(0)).toBeUndefined();
      expect(resultsThrow.at(1)).toEqual(myError);
    });
  });

  describe("assertErrorsOnceAsync", () => {
    it("runs as a one-off function", async () => {
      const results = await assertErrorsOnceAsync(MyError, doesNotThrow);
      expect(results.at(0)).toBeTruthy();
      expect(results.at(1)).toBeUndefined();

      const resultsThrow = await assertErrorsOnceAsync(MyError, doesThrow);
      expect(resultsThrow.at(0)).toBeUndefined();
      expect(resultsThrow.at(1)).toEqual(myError);
    });
  });
});
