import React from "react";
import ReactDOM from "react-dom/client";
import App from "./core/App"; // 👈 MUY IMPORTANTE
import "./index.css"; // o "./core/styles/index.css" si lo moviste

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);