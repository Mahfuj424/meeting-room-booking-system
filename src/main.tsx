import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/index.tsx";
import DarkModeProvider from "./DarkModeContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DarkModeProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </DarkModeProvider>
  </React.StrictMode>
);
