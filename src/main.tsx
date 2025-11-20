import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { AppWithProviders } from "./components/app-with-providers";
import "./index.css";

const root = document.getElementById("root");

createRoot(root!).render(
  <StrictMode>
    <AppWithProviders />
  </StrictMode>,
);
