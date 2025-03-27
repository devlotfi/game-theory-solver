import { useQuery } from "@tanstack/react-query";
import { loadPyodide } from "pyodide";
import { PropsWithChildren } from "react";
import { PyodideContext } from "../context/pyodide-context";
import PythonSVG from "../assets/python.svg";
import { Spinner } from "@heroui/react";

export default function PyodideProvider({ children }: PropsWithChildren) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["PYODIDE"],
    queryFn: async () => {
      const response = await fetch(`main.py`);
      const code = await response.text();
      const pyodide = await loadPyodide();
      await pyodide.runPythonAsync(code);
      return pyodide;
    },
  });

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col gap-[1rem] justify-center items-center bg-content1">
        <img src={PythonSVG} alt="python" className="h-[3.8rem]" />
        <div className="flex mb-[2rem] text-[15pt] text-center">
          Loading python interpreter...
        </div>
        <Spinner color="primary" size="lg"></Spinner>
      </div>
    );
  }

  if (isError) {
    return <div className="flex">An error occured</div>;
  }

  return (
    <PyodideContext.Provider
      value={{
        pyodide: data!,
      }}
    >
      {children}
    </PyodideContext.Provider>
  );
}
