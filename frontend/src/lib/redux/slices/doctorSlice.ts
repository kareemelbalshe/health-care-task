import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axios";
import { toast } from "react-toastify";

const initialState: any = {
  doctors: {},
  loading: false,
  error: null,
};

export const handleGetDoctors = createAsyncThunk(
  "doctor/getDoctors",
  async (
    {
      page = 1,
      limit = 10,
      username,
      email,
      specialization,
      phone,
      address,
    }: {
      page: number;
      limit?: number;
      username?: string;
      email?: string;
      specialization?: string;
      phone?: string;
      address?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(
        `/doctor?page=${page}&limit=${limit}&username=${username}&email=${email}&specialization=${specialization}&phone=${phone}&address=${address}`
      );
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Get Doctors failed");
      return rejectWithValue(
        error.response?.data?.message || "Get Doctors failed"
      );
    }
  }
);

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleGetDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleGetDoctors.fulfilled, (state, action) => {
        state.doctors = action.payload;
        state.loading = false;
      })
      .addCase(handleGetDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default doctorSlice.reducer;
