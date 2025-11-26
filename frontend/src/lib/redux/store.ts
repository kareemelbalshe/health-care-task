import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import doctorSlice from "./slices/doctorSlice";
import userSlice from "./slices/userSlice";
import visitSlice from "./slices/visitSlice";
import medicineSlice from "./slices/medicineSlice";
import financeSlice from "./slices/financeSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    doctor: doctorSlice,
    user: userSlice,
    visit: visitSlice,
    medicine: medicineSlice,
    finance: financeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
