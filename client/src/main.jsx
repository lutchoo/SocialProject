import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { Provider } from "react-redux";
import "./style/settings.css";

// import { configureStore } from "@reduxjs/toolkit";
// import { userSlice } from "./app/slices/userSlice"; // Importez votre slice, pas useReducer
import { fetchAllUser} from "./app/slices/usersSlice.jsx";
import store from "./app/store.jsx";

// const store = configureStore({
//   reducer: {
//     currentUser: userSlice.reducer, // Utilisez userSlice.reducer pour ajouter votre reducer
//     allUser: usersSlice.reducer
//   }
// });
store.dispatch(fetchAllUser());

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
