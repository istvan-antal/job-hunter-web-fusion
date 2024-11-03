import type { Context } from '../context';

const test = async (a: number, b: number, _context: Context) => {
    return a + b + 3;
};

export default test;
