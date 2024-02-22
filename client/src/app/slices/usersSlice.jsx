import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    status: "idle",
    users: null
  };

export const fetchAllUser = createAsyncThunk(
    "users/fetchAllUser",
    async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/user/`,
          { withCredentials: true }
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  );

export const usersSlice = createSlice({
    name: "users",
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
      builder
  
        .addCase(fetchAllUser.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.users = action.payload;
        })
    },
  });
  