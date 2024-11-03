const cookieProperty = Symbol.for('cookies');

export const withCookies = (result: { [key: symbol | string | number]: unknown }, cookies: Record<string, string>) => {
    if (result) {
        result[cookieProperty] = cookies;
    }

    return result;
};

export const extractCookies = (value: {
    [key: symbol | string | number]: unknown;
}): Record<string, string> | undefined => {
    const result = (value ? value[cookieProperty] : {}) as Record<string, string> | undefined;

    return result;
};
