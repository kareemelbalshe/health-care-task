import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axios";
import { toast } from "react-toastify";

interface FinanceUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: "finance";
  followDoctor: string;
}

interface Medicine {
  _id: string;
  name: string;
  amount: number;
  description?: string;
  cost: number;
}

interface FinanceState {
  financeUser: FinanceUser | null;
  medicines: Medicine[];
  totalCost: number;
  loading: boolean;
  error: string | null;
}

const initialState: FinanceState = {
  financeUser: null,
  medicines: [],
  totalCost: 0,
  loading: false,
  error: null,
};


export const handleCreateFinance = createAsyncThunk(
  "finance/createFinance",
  async (
    {
      name,
      email,
      password,
      phone,
    }: {
      name: string;
      email: string;
      password: string;
      phone: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await axiosInstance.post("/finance", {
        name,
        email,
        password,
        phone,
      });

      toast.success("Finance user created successfully");
      return res.data.user;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create finance user");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);


export const handleGetCostMedicines = createAsyncThunk(
  "finance/getCostMedicines",
  async (visitId: string, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/finance/cost/${visitId}`);
      return res.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to load medicines cost");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(handleCreateFinance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleCreateFinance.fulfilled, (state, action) => {
        state.loading = false;
        state.financeUser = action.payload;
      })
      .addCase(handleCreateFinance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(handleGetCostMedicines.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleGetCostMedicines.fulfilled, (state, action) => {
        state.loading = false;
        state.medicines = action.payload.medicines || [];
        state.totalCost = action.payload.totalCost || 0;
      })
      .addCase(handleGetCostMedicines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default financeSlice.reducer;
