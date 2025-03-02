import { Button } from "@heroui/react";
import { useEffect } from "react";
import { loadPyodide } from "pyodide";

export default function App() {
  useEffect(() => {
    async function hello_python() {
      console.log("loading python");
      const pyodide = await loadPyodide();
      console.log(pyodide);

      console.log("running");
      const res = await pyodide.runPythonAsync("1+1");
      console.log(res);
    }

    hello_python();
  }, []);

  return (
    <div className="flex">
      <h1>lol</h1>
      <Button>lol</Button>
    </div>
  );
}
