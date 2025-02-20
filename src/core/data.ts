/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type FunctionCollection from '../main/functions';

type FunctionCollectionType = typeof FunctionCollection;

export type DataLoading = {
    loading: true;
    data: undefined;
    error: undefined;
};

export type DataError = {
    loading: undefined;
    data: undefined;
    error: Error;
};

export type DataComplete<R> = {
    loading: false;
    data: R;
    error: undefined;
};

type Pop<T extends any[]> = T extends [...infer U, any] ? U : never;

export function useQuery<T extends keyof FunctionCollectionType>(
    functionName: T,
    {
        params,
        skip = false,
        pollInterval,
    }: {
        params: Pop<Parameters<FunctionCollectionType[T]>>;
        pollInterval?: number;
        skip?: boolean;
    },
) {
    const active = useRef(true);
    const [state, setState] = useState<
        DataLoading | DataError | DataComplete<Awaited<ReturnType<FunctionCollectionType[T]>>>
    >({
        data: undefined,
        loading: true,
        error: undefined,
    });

    const reload = useCallback(
        (completeReload = false) => {
            (async () => {
                if (completeReload) {
                    setState({
                        loading: true,
                        data: undefined,
                        error: undefined,
                    });
                }
                const result = await fetch(`/api/${functionName}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(params),
                });

                if (!active.current) {
                    return;
                }

                if (result.status !== 200) {
                    throw new Error(`Response status code: ${result.status} ${result.statusText}`);
                }

                setState({
                    loading: false,
                    data: await result.json(),
                    error: undefined,
                });
            })().catch((error) => {
                setState({
                    loading: undefined,
                    data: undefined,
                    error,
                });
            });
        },
        [JSON.stringify(params)],
    );

    useEffect(() => {
        if (!skip) {
            reload();

            const interval = pollInterval ? setInterval(reload, pollInterval) : undefined;

            return () => {
                if (interval && pollInterval) {
                    clearInterval(interval);
                }
            };
        }
    }, [JSON.stringify(params), skip]);

    useEffect(() => {
        active.current = true;
        return () => {
            active.current = false;
        };
    }, []);

    return useMemo(
        () => ({
            ...state,
            reload,
        }),
        [state, reload],
    );
}
