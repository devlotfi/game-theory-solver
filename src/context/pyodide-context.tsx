import { PyodideInterface } from "pyodide";
import { createContext } from "react";

interface PyodideContextType {
  pyodide: PyodideInterface;
}

export const initialValue: PyodideContextType = {
  pyodide: {} as unknown as PyodideInterface,
};

export const PyodideContext = createContext(initialValue);
