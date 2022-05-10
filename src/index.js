import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import "./style/index.css";
import "./style/global.module.css";
import "./style/variables.module.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
