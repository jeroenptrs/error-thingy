import { type Integer } from "type-fest/source/numeric";

export const add = <T extends number>(a: Integer<T>, b: Integer<T>): number => a + b;
