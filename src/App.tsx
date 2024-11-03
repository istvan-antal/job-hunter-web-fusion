import "./App.css";
// @deno-types="@types/react"
import { useState } from "react";
import useTest from "./home/hooks/useTest.ts";

function App() {
  const test = useTest();
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button
          type="button"
          onClick={() => {
            setCount((count) => count + 1);
            test(1, 2).then((result) => {
              console.log({ result });
            });
          }}
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
