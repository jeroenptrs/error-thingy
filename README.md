<h1 align="center">❗️ assert-errors</h1>

<p align="center">A library attempting to make errors a bit more typed</p>
<hr />

## Goal

The goal of this package is to provide runtime checks against one or more defined Error classes, while wrapping around a normal or async function.
It will return a tuple of type [result, error].  
If the wrapped function doesn't throw, result will be defined. If it does throw, error will be returned.  
If the wrapped function returns an error that does not match the checks, it will throw an `UnknownError`, which contains the originalError `e.originalError`.

## Installation

`yarn add @jeroenpeeters/assert-errors`

## API

### sync

For normal functions, we provide the following APIs - `assertErrors, assertErrorsCurry, asserErrorsOnce`:

```typescript
import { assertErrors, assertErrorsCurry, asserErrorsOnce } from "@jeroenpeeters/assert-errors";

const wrappedFunction = assertErrors(MyError, myFunc);
const wrappedFunction = assertErrors([MyError, MyOtherError], myFunc);

const assertMyError = assertErrorsCurry(MyError);
const wrappedFunction = assertMyError(myFunc);
const assertMyErrors = assertErrorsCurry([MyError, MyOtherError]);
const wrappedFunction = assertMyErrors(myFunc);

const [result, error] = wrappedFunction(myArg, myOtherArg);

const [result, error] = assertErrorsOnce(MyError, myFunc, myArg, myOtherArg);
const [result, error] = assertErrorsOnce([MyError, MyOtherError], myFunc, myArg, myOtherArg);
```

### async

For async functions, we provide these APIs - `assertErrorsAsync, assertErrorsCurryAsync, asserErrorsOnceAsync`:

```typescript
import {
  assertErrorsAsync,
  assertErrorsCurryAsync,
  asserErrorsOnceAsync,
} from "@jeroenpeeters/assert-errors";

const wrappedFunction = assertErrorsAsync(MyError, myAsyncFunc);
const wrappedFunction = assertErrorsAsync([MyError, MyOtherError], myAsyncFunc);

const assertMyError = assertErrorsCurryAsync(MyError);
const wrappedFunction = assertMyError(myAsyncFunc);
const assertMyErrors = assertErrorsCurryAsync([MyError, MyOtherError]);
const wrappedFunction = assertMyErrors(myAsyncFunc);

const [result, error] = await wrappedFunction(myArg, myOtherArg);

const [result, error] = await asserErrorsOnceAsync(MyError, myAsyncFunc, myArg, myOtherArg);
const [result, error] = await asserErrorsOnceAsync(
  [MyError, MyOtherError],
  myAsyncFunc,
  myArg,
  myOtherArg
);
```
