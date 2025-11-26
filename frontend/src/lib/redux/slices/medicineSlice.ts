import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axios";
import { toast } from "react-toastify";

interface Medicine {
  _id: string;
  visitId: string;
  name: string;
  count: number;
  description?: string;
  cost: number;
}

interface MedicineState {
  medicines: Medicine[];
  loading: boolean;
  error: string | null;
}

const initialState: MedicineState = {
  medicines: [],
  loading: false,
  error: null,
};

export const handleGetMedicines = createAsyncThunk(
  "medicine/getMedicines",
  async (visitId: string, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/medicine/${visitId}`);
      return res.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Get medicines failed");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);


export const handleCreateMedicine = createAsyncThunk(
  "medicine/createMedicine",
  async (
    {
      visitId,
      name,
      count,
      description,
      cost,
    }: {
      visitId: string ;
      name: string;
      count: number;
      description?: string;
      cost: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await axiosInstance.post(`/medicine/${visitId}`, {
        name,
        count,
        description,
        cost,
      });
      toast.success("Medicine created successfully");
      return res.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Create medicine failed");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);


export const handleUpdateMedicine = createAsyncThunk(
  "medicine/updateMedicine",
  async (
    {
      id,
      body,
    }: {
      id: string;
      body: Partial<Medicine>;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await axiosInstance.put(`/medicine/${id}`, body);
      toast.success("Medicine updated");
      return res.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Update medicine failed");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);


export const handleDeleteMedicine = createAsyncThunk(
  "medicine/deleteMedicine",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete(`/medicine/${id}`);
      toast.success("Medicine deleted");
      return res.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Delete medicine failed");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const medicineSlice = createSlice({
  name: "medicine",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleGetMedicines.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleGetMedicines.fulfilled, (state, action) => {
        state.loading = false;
        state.medicines = action.payload;
      })
      .addCase(handleGetMedicines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(handleCreateMedicine.fulfilled, (state, action) => {
        state.medicines.push(action.payload);
      })

      .addCase(handleUpdateMedicine.fulfilled, (state, action) => {
        state.medicines = state.medicines.map((m) =>
          m._id === action.payload._id ? action.payload : m
        );
      })

      .addCase(handleDeleteMedicine.fulfilled, (state, action) => {
        state.medicines = state.medicines.filter(
          (m) => m._id !== action.payload._id
        );
      });
  },
});

export default medicineSlice.reducer;
