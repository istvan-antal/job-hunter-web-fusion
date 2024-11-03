import test from "./core/api/test.ts";

// deno-lint-ignore no-explicit-any
const functions: { [key: string]: (...args: any[]) => Promise<unknown> } = {
    test,
};

export default functions;
