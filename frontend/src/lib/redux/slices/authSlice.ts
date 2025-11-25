import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../lib/axios/axios";
import Cookies from "js-cookie";

export const handleRegister = createAsyncThunk(
  "auth/register",
  async (
    {
      username,
      email,
      password,
      role,
      specialization,
      phone,
    }: {
      email: string;
      password: string;
      username: string;
      role: string;
      specialization?: string;
      phone: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const body: any = {
        email,
        password,
        username,
        role,
        phone,
      };

      if (role === "doctor") {
        body.specialization = specialization;
      }

      const response = await axiosInstance.post("/auth/register", body);

      Cookies.set("userInfo", JSON.stringify(response.data), { expires: 7 });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Register failed");
    }
  }
);

export const handleLogin = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      Cookies.set("userInfo", JSON.stringify(response.data), { expires: 7 });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

const initialState = {
  isAuthenticated: !!Cookies.get("userInfo"),
  user: Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo") as string)
    : null,
  loading: false,
  error: "" as string | null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      Cookies.remove("userInfo");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleLogin.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(handleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(handleRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleRegister.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(handleRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;
