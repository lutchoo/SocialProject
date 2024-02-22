import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlice"; // Importez votre slice, pas useReducer
import { usersSlice } from "./slices/usersSlice";

export default configureStore({
  reducer: {
    currentUser: userSlice.reducer, // Utilisez userSlice.reducer pour ajouter votre reducer
    allUser: usersSlice.reducer
    
  }
});
