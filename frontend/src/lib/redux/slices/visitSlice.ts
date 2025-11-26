import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axios";
import { toast } from "react-toastify";

const initialState: any = {
  visits: [],
  visit: null,
  activeVisit: null,
  patientVisits: {},
  loading: false,
  error: null,
};

export const handleGetVisitsToDoctor = createAsyncThunk(
  "visits/getVisitsToDoctor",
  async (
    {
      doctorId,
      date,
      patientName,
      paymentStatus,
    }: {
      doctorId: string;
      date?: Date | string;
      patientName?: string;
      paymentStatus?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(
        `/visit/doctor/${doctorId}?date=${date || ""}&patientName=${patientName || ""}&paymentStatus=${paymentStatus || ""}`
      );
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to get visits");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const handleGetVisitById = createAsyncThunk(
  "visits/getVisitById",
  async (visitId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/visit/${visitId}`);
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to load visit");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const handleGetActiveVisit = createAsyncThunk(
  "visits/getActiveVisit",
  async (doctorId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/visit/active/${doctorId}`);
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to load visit");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const handleGetVisitsToPatient = createAsyncThunk(
  "visits/getVisitsToPatient",
  async (
    {
      patientId,
      page = 1,
      limit = 10,
    }: { patientId: string; page?: number; limit?: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(
        `/visit/patient/${patientId}?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to get visits");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const handleCreateVisit = createAsyncThunk(
  "visits/createVisit",
  async (
    { notes, doctorId }: { notes: string; doctorId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post(`/visit/${doctorId}`, {
        notes,
      });
      toast.success("Visit created successfully");
      return response.data.visit;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create visit");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const handleUpdateVisit = createAsyncThunk(
  "visits/updateVisit",
  async (
    {
      visitId,
      data,
    }: {
      visitId: string;
      data: {
        status?: string;
        paymentStatus?: string;
        cost?: number;
        startDate?: Date | string;
        endDate?: Date | string;
      };
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.patch(`/visit/${visitId}`, data);
      toast.success("Visit updated successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update visit");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const handleUpdateVisitToPatient = createAsyncThunk(
  "visits/updateVisitPatient",
  async (
    {
      visitId,
      status = "canceled",
    }: {
      visitId: string;
      status?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.patch(`/visit/${visitId}/patient`, {
        status,
      });
      toast.success("Visit updated successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update visit");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const visitSlice = createSlice({
  name: "visit",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(handleGetVisitsToDoctor.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleGetVisitsToDoctor.fulfilled, (state, action) => {
        state.visits = action.payload;
        state.loading = false;
      })
      .addCase(handleGetVisitsToDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(handleGetVisitById.fulfilled, (state, action) => {
        state.visit = action.payload;
      })

      .addCase(handleGetActiveVisit.fulfilled, (state, action) => {
        state.activeVisit = action.payload;
      })

      .addCase(handleGetVisitsToPatient.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleGetVisitsToPatient.fulfilled, (state, action) => {
        state.patientVisits = action.payload;
        state.loading = false;
      })
      .addCase(handleGetVisitsToPatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(handleCreateVisit.fulfilled, (state, action) => {
        state.visits = [action.payload, ...state.visits];
      })

      .addCase(handleUpdateVisit.fulfilled, (state, action) => {
        state.visit = action.payload;
      })

      .addCase(handleUpdateVisitToPatient.fulfilled, (state, action) => {
        state.visit = action.payload;
      });
  },
});

export default visitSlice.reducer;
