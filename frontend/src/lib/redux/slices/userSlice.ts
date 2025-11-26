import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axios";
import { toast } from "react-toastify";

const initialState: any = {
  user: {},
  loading: false,
  error: null,
};

export const handleGetUser = createAsyncThunk(
  "user/getUser",
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/user/${id}`);
      return response.data;
    } catch (error: any) {
            toast.error(error.response?.data?.message || "Get Doctors failed");
      
      return rejectWithValue(
        error.response?.data?.message || "Get Users failed"
      );
    }
  }
);
export const handleUpdateUser = createAsyncThunk(
  "user/updateUser",
  async (
    {
      id,
      username,
      phone,
      address,
    }: { id: string; username: string; phone: string; address: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.put(`/user/${id}`, {
        username,
        phone,
        address,
      });
      return response.data;
    } catch (error: any) {
            toast.error(error.response?.data?.message || "Get Doctors failed");

      return rejectWithValue(
        error.response?.data?.message || "Get Users failed"
      );
    }
  }
);
export const handleDeleteUser = createAsyncThunk(
  "user/deleteUser",
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/user/${id}`);
      return response.data;
    } catch (error: any) {
            toast.error(error.response?.data?.message || "Get Doctors failed");

      return rejectWithValue(
        error.response?.data?.message || "Get Users failed"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleGetUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleGetUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(handleGetUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(handleUpdateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleUpdateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(handleUpdateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(handleDeleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleDeleteUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(handleDeleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
