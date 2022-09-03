import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./css/index.css";
import "./i18n";
import { store } from "@store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
        {import.meta.env.VITE_SHOW_REACT_QUERY_DEVTOOL === "true" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
