import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../../Firebase';
// Async thunk action creator
export const fetchUsersInfo = createAsyncThunk(
    'users/fetchUsersInfo',
    async () => {
      const querySnapshot = await getDocs(collection(db, 'UsersInfo'));
      const users = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      
      return users;
    }
  );


// Async thunk action creator to register a new user
export const registerNewUser = createAsyncThunk(
    'users/registerNewUser',
    async ({ name, email, password }) => {
        const data = {
            Name: name,
            Email: email,
            Password: password
        };

        // Add a new document in collection "UsersInfo"
        // Add a new document with a generated id.
        const res = await addDoc(collection(db, "UsersInfo"), data);
        console.log(res);
        return res;
        // // Notification for new user
        // toast.success("New user added!.");
    }
);

// Initial State
const initialState = {name:'', email:'', password:'', users:undefined, isLoggedIn:false, userState:null, error:null, registerUserState:null};

const loginSlice = createSlice({
    name:'loginForm',
    initialState,

    reducers:{
        setName:(state, action)=>{
            state.name = action.payload;
        },

        setEmail:(state, action)=>{
            state.email = action.payload;
        },

        setPassword:(state, action)=>{
            state.password = action.payload;
        },

        setUsers:(state, action)=>{
            state.users = action.payload;
        },

        setIsLoggedIn:(state, action)=>{
            state.isLoggedIn = action.payload;
        }
    },

    extraReducers: (builder) => {
        builder
          .addCase(fetchUsersInfo.pending, (state) => {
            state.userState = 'loading';
          })
          .addCase(fetchUsersInfo.fulfilled, (state, action) => {
            state.userState = 'succeeded';
            state.users = action.payload;
          })
          .addCase(fetchUsersInfo.rejected, (state, action) => {
            state.userState = 'failed';
            state.error = action.error.message;
          })
          
          .addCase(registerNewUser.pending, (state) => {
            state.userState = 'loading'; // Set loading state
          })

          .addCase(registerNewUser.fulfilled, (state) => {
            state.userState = 'succeeded'; // Set success state
          })
          .addCase(registerNewUser.rejected, (state, action) => {
            state.userState = 'failed'; // Set failed state
            state.error = action.error.message; // Set error message
          })
    }
})

export const loginReducer = loginSlice.reducer;

export const {setName, setEmail, setPassword, setUsers, setIsLoggedIn} = loginSlice.actions;
export const loginSelector = (state) => state.loginReducer;
