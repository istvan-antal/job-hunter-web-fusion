import test from './core/api/test';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const functions: { [key: string]: (...args: any[]) => Promise<unknown> } = {
    test,
};

export default functions;
