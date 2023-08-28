import { isExpectedError } from "./isExpectedError";

class MyError extends Error {}
class MyOtherError extends Error {}

const myError = new MyError("");
const myOtherError = new MyOtherError("");

describe("isExpectedError", () => {
  it("returns truthy when errors match", () => {
    expect(isExpectedError(MyError, myError)).toBeTruthy();
  });

  it("returns falsy when errors don't match", () => {
    expect(isExpectedError(MyError, myOtherError)).toBeFalsy();
  });
});
