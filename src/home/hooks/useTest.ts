import { useMemo } from "react";
import type test from "../../core/api/test.ts";
import { createServerHook } from "../../core/serverHooksCreators.ts";

const useTest = () => useMemo(() => createServerHook<typeof test>("test"), []);

export default useTest;
