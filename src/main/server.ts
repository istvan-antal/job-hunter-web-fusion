import cookieParser from 'cookie-parser';
import express from 'express';
import { TokenExpiredError, verify } from 'jsonwebtoken';
import { createServer as createViteServer } from 'vite';
import type { User } from '../core/entities/User.ts';
import { extractCookies } from '../core/http.ts';
import serverFunctions from './functions.ts';

const app = express();

app.use(cookieParser());
app.use(express.json());

const port = +(process.env.PORT || '14001');

app.use(express.static('dist'));

const decodeToken = <T>(token: string) => {
    const jwtSecret = process.env.JWT_SECRET || '__SECRET_CHANGE_ME__';
    return verify(token, jwtSecret) as unknown as T;
};

const extractUser = (accessToken: string | undefined) => {
    try {
        return accessToken ? (decodeToken(accessToken) as { user: User }).user : undefined;
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return undefined;
        }

        throw error;
    }
};

app.post('/api/:function', (request, response) => {
    (async () => {
        const accessToken = request.cookies['access-token'] as string | undefined;

        const args = request.body;

        if (!args) {
            response.status(400).json({});
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await (serverFunctions as { [key: string]: (...args: any[]) => Promise<unknown> })[
            request.params.function
        ](...args, {
            user: extractUser(accessToken),
        });

        const cookies = extractCookies(result as unknown as { [key: symbol | string | number]: unknown });

        if (cookies) {
            for (const [name, value] of Object.entries(cookies)) {
                response.cookie(name, value);
            }
        }

        response.json(result || null);
    })().catch((error) => {
        throw error;
    });
});

app.use((req, _res, next) => {
    console.info(`Request: ${req.method} ${req.url}`);
    next();
});

if (process.env.CLIENT_DEV) {
    const vite = await createViteServer({
        // plugins: [react()],
        server: { middlewareMode: true },
        appType: 'mpa',
    });
    // Use vite's connect instance as middleware
    app.use(vite.middlewares);
}

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
