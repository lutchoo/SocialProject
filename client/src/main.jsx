import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import store from "./app/store.jsx";
import { Provider } from "react-redux";
import "./style/settings.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
