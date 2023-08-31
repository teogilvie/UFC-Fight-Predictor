import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { FighterProvider } from "./context/fighterContext.jsx";

import "./global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FighterProvider>
      <App />
    </FighterProvider>
  </React.StrictMode>
);
