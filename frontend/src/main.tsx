import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import AuthLoader from "./components/AuthLoader.tsx";
import TanstackProvider from "./components/TanstackProvider.tsx";
import ReactToastifyProviders from "./components/ReactToastifyProviders.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TanstackProvider>
      <AuthLoader>
        <ReactToastifyProviders>
          <App />
        </ReactToastifyProviders>
      </AuthLoader>
    </TanstackProvider>
  </StrictMode>,
);
