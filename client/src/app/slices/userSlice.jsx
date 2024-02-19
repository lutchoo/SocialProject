import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  user: null,
  error: null,
};

export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async (uid) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/api/user/${uid}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// export const fetchUser = createAsyncThunk("user/fetchUser", async (id) => {
//   try {
//     const response = await axios.get(`http://localhost:8081/api/user/${id}`);
//     return response.data;
//   } catch (err) {
//     console.log(err);
//   }
// });

export const uploadPicture = createAsyncThunk(
  "user/uploadPicture",
  async (data, id) => {
    try {
      const response = await axios.post(
        "http://localhost:8081/api/user/upload",
        data
      );
      const res = await axios.get(`http://localhost:8081/api/user/${id}`);
      // if (res) console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCurrentUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(uploadPicture.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(uploadPicture.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload && action.payload.picture) {
          console.log("ACTION" + action.payload);
          state.user.picture = action.payload.picture;
        }
      })
      .addCase(uploadPicture.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
