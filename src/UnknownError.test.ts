import { UnknownError } from "./UnknownError";
import { ES5Object } from "./utilTypes";

const myError = new Error("");

describe("UnknownError", () => {
  it("adds the original error to error.originalError", () => {
    expect(new UnknownError(myError).originalError).toEqual(myError);
  });

  it("sets modern prototype", () => {
    expect(Object.getPrototypeOf(new UnknownError(myError))).toBeTruthy();
  });

  it("sets ES5 proto", () => {
    const setPrototypeOf = Object.setPrototypeOf;
    Object.setPrototypeOf = undefined as unknown as typeof Object.setPrototypeOf;

    const ProtoError = new UnknownError(myError);
    expect((ProtoError as unknown as ES5Object).__proto__).toBeTruthy();

    // Clean up
    Object.setPrototypeOf = setPrototypeOf;
  });
});
