import { ES5Object } from "./utilTypes";

// Taken from https://stackoverflow.com/a/48342359

export class UnknownError extends Error {
  constructor(readonly originalError: unknown) {
    super("An unknown error has been detected, find it in error.originalError");

    // restore prototype chain
    const actualProto = new.target.prototype;

    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      (this as unknown as ES5Object).__proto__ = actualProto;
    }
  }
}
