import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { axiosTrail } from "../services/api";
import { GET_EMPLOYEE_PROFILE } from "../constant/url-helper";

const initialState = {
    userDetails: [],
    loading: false,
}

export const getUserDetails = createAsyncThunk(
    "profile/getUserDetails",
    async (payload, thunk) => {
        try {
            const res = await axiosTrail.get(GET_EMPLOYEE_PROFILE);
            if (res?.data) {
                return res?.data;
            }
        }
        catch (e) {
            toast.error(e?.response?.data?.message || "Internal Server Error");
            return thunk.rejectWithValue(e?.response?.data);
        }
    }
)

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        // List Organisations
        builder.addCase(getUserDetails.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getUserDetails.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.userDetails = payload?.data || null;
        });
        builder.addCase(getUserDetails.rejected, (state) => {
            state.loading = false;
        });
    },
})

export default profileSlice.reducer