import { spawn } from "node:child_process";
import process from "node:process";
import cookieParser from "npm:cookie-parser";
// @deno-types="@types/express"
import express from "npm:express";
import { TokenExpiredError, verify } from "npm:jsonwebtoken";
import type { User } from "./core/entities/User.ts";
import { extractCookies } from "./core/http.ts";
import serverFunctions from "./functions.ts";

const app = express();

app.use(cookieParser());
app.use(express.json());

if (process.env.CLIENT_DEV) {
    console.log("process.env.CLIENT_DEV");
    const command = spawn("deno", ["task", "dev"], {
        env: {
            VITE__PORT: "14000",
        },
        stdio: ["inherit", "pipe", "pipe"],
        shell: true,
    });

    command.stdout?.on("data", (data) => {
        console.log(data.toString());
    });

    command.stderr?.on("data", (data) => {
        console.error(data.toString());
    });
}

const port = +(process.env.PORT || "14001");

app.use(express.static("dist"));

const decodeToken = <T>(token: string) => {
    const jwtSecret = process.env.JWT_SECRET || "__SECRET_CHANGE_ME__";
    return verify(token, jwtSecret) as unknown as T;
};

const extractUser = (accessToken: string | undefined) => {
    try {
        return accessToken
            ? (decodeToken(accessToken) as { user: User }).user
            : undefined;
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return undefined;
        }

        throw error;
    }
};

app.post("/api/:function", (request, response) => {
    (async () => {
        const accessToken = request.cookies["access-token"] as
            | string
            | undefined;

        const args = request.body;

        if (!args) {
            response.status(400).json({});
        }

        const result = await serverFunctions[request.params.function](...args, {
            user: extractUser(accessToken),
        });

        const cookies = extractCookies(
            result as unknown as { [key: symbol | string | number]: unknown },
        );

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

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
