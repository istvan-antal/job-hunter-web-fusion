import type { Context } from "../context.ts";

const test = async (a: number, b: number, _context: Context) => {
    return a + b;
};

export default test;
