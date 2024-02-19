import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlice"; // Importez votre slice, pas useReducer

export default configureStore({
  reducer: {
    currentUser: userSlice.reducer, // Utilisez userSlice.reducer pour ajouter votre reducer
  },
});
