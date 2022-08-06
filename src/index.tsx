import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./css/index.css";
import "./i18n";
import { store } from "./store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
