import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import DarkModeProvider from "./DarkModeContext";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { Toaster } from "sonner";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="font-poppins">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <DarkModeProvider>
            {/* Remove <App /> and directly use RouterProvider */}
            <RouterProvider router={router} />
          </DarkModeProvider>
        </PersistGate>
      </Provider>
      <Toaster />
    </div>
  </React.StrictMode>
);
