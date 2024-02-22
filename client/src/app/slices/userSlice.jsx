import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  user: null
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
  async ({ data, id }) => { // Utiliser un objet pour passer plusieurs valeurs
    try {
      const response = await axios.post(
        "http://localhost:8081/api/user/upload",
        data
      );

      console.log(response);
      const res = await axios.get(`http://localhost:8081/api/user/${id}`);
      // if (res) console.log(res.data);
      return res.data, window.location.reload(); // Retourner directement res.data
    } catch (err) {
      console.log(err);
    }
  }
);
export const updateBio = createAsyncThunk(
  "user/updateBio",
  async ({ userId, bio }) => {
    try {
      const response = await axios({
        method: "put",
        url: `http://localhost:8081/api/user/${userId}`,
        data: {
          bio: bio,
        },
      });
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const followedUser = createAsyncThunk(
  "user/followedUser",
  async ({followerId, idToFollow})=>{
    try{
      const response =  axios.put(`http://localhost:8081/api/user/follow/${followerId}`, {idToFollow})
      return response.data,  window.location.reload()
    }catch(err){
      console.log(err);
    }
  }
)
export const UnFollowedUser = createAsyncThunk(
  "user/unFollowedUser",
  async ({followerId, idToUnFollow})=>{
   
    try {
      const response = await axios.put(`http://localhost:8081/api/user/unfollow/${followerId}`,{idToUnFollow});
      return response.data,  window.location.reload()
    } catch(err) {
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

      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(uploadPicture.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(updateBio.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(followedUser.fulfilled,(state,action)=>{
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(UnFollowedUser.fulfilled, (state, action) => {
        // Mettre à jour uniquement les followers dans l'état de l'utilisateur
        state.user = {
          ...state.user, // Conserver les autres informations inchangées
          followers: action.payload // Mettre à jour les followers avec les nouvelles données
        };
        state.status = "succeeded";
      });
  
  },
});
