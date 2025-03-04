import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { HeroUIProvider } from "@heroui/react";
import {
  createHashHistory,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen.ts";
import { ThemeProvider } from "./provider/theme-provider.tsx";

const hashHistory = createHashHistory();

const router = createRouter({
  routeTree,
  basepath: "/game-theory-solver",
  history: hashHistory,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HeroUIProvider>
      <ThemeProvider>
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </HeroUIProvider>
  </StrictMode>
);
