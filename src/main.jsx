import React from "react";
import ReactDOM from "react-dom/client";
import App from "./core/App";
import "./styles/global.css";

// 🔥 IMPORTANTE
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// crear cliente
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* ENVOLVER TODA LA APP */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);