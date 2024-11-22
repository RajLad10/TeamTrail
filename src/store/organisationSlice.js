import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { decryptReactData } from "../constant";
import { axiosTrail } from "../services/api";
import { DELETE_ORGANIZATION, LIST_ORGANIZATIONS, SAVE_ORGANIZATION } from "../constant/url-helper";

const initialState = {
  org: [],
  loading: false,
}

export const listOrganizations = createAsyncThunk(
  "organisations/listOrganizations",
  async ({ data, cb } = {}, thunk) => {
    try {
      console.log("Payload", data);
      const res = await axiosTrail.post(LIST_ORGANIZATIONS, data);
      if (res?.data) {
        let decryptedResponse = decryptReactData(res?.data?.data, import.meta.env.VITE_ENCRYPTION_DECRYPTION_KEY);
        console.log("Dec", decryptedResponse);
        cb(decryptedResponse?.data?.total);
        return decryptedResponse?.data;
      }
    }
    catch (e) {
      toast.error(e?.response?.data?.message || "Server Error");
      return thunk.rejectWithValue(e?.response?.data);
    }
  }
);

export const addEditOrganisation = createAsyncThunk(
  "organisations/addEditOrganisation",
  async ({ data, cb } = {}, thunk) => {
    try {
      const res = await axiosTrail.post(SAVE_ORGANIZATION, data);
      if (res?.data) {
        let decryptedResponse = decryptReactData(res?.data?.data, import.meta.env.VITE_ENCRYPTION_DECRYPTION_KEY);
        cb();
        toast.success(decryptedResponse?.message);
        return decryptedResponse?.data;
      }
    }
    catch (e) {
      toast.error(e?.response?.data?.message || "Server Error");
      return thunk.rejectWithValue(e?.response?.data);
    }
  }
);

export const deleteOrganisation = createAsyncThunk(
  "organisations/deleteOrganisation",
  async ({ data, cb } = {}, thunk) => {
    try {
      const res = await axiosTrail.post(DELETE_ORGANIZATION, data);
      if (res?.data) {
        let decryptedResponse = decryptReactData(res?.data?.data, import.meta.env.VITE_ENCRYPTION_DECRYPTION_KEY);
        cb();
        toast.success(decryptedResponse?.message);
        return decryptedResponse?.data;
      }
    }
    catch (e) {
      toast.error(e?.response?.data?.message || "Server Error");
      return thunk.rejectWithValue(e?.response?.data);
    }
  }
);

export const organisationSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    // List Organisations
    builder.addCase(listOrganizations.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(listOrganizations.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.org = payload?.data || null;
    });
    builder.addCase(listOrganizations.rejected, (state) => {
      state.loading = false;
    });

    // Add / Edit Organisation
    builder.addCase(addEditOrganisation.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addEditOrganisation.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.org = payload?.data || null;
    });
    builder.addCase(addEditOrganisation.rejected, (state) => {
      state.loading = false;
    });

    // Delete Organisation
    builder.addCase(deleteOrganisation.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteOrganisation.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.org = payload?.data || null;
    });
    builder.addCase(deleteOrganisation.rejected, (state) => {
      state.loading = false;
    });
  },
})

export default organisationSlice.reducer