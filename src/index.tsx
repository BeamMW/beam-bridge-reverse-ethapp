import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { config } from "@core/wagmiConfig"
import { BrowserRouter as Router } from "react-router-dom";
import "babel-polyfill";
/// <reference types="react-scripts" />

import configureStore from "@app/store/store";
import App from "./app";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const { store } = configureStore();
const queryClient = new QueryClient();

window.global = window;

export default store;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router>
    <Provider store={store}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}> 
          <App />
        </QueryClientProvider>
      </WagmiProvider>
    </Provider>
  </Router>
);
