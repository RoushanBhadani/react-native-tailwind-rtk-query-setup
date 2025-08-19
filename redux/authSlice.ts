// redux/authSlice.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  loading: true,
};

export const loadStoredAuth = createAsyncThunk("auth/loadStoredAuth", async () => {
  const token = await AsyncStorage.getItem("token");
  return token;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      AsyncStorage.setItem("token", action.payload.token); 
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      AsyncStorage.removeItem("token"); // ✅ clear
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadStoredAuth.fulfilled, (state, action) => {
      if (action.payload) {
        state.token = action.payload;
        state.isAuthenticated = true;
      }
      state.loading = false;
    });
    builder.addCase(loadStoredAuth.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
