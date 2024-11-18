import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { decryptReactData } from "../constant";
import { axiosTrail } from "../services/api";
import { LIST_ORGANIZATIONS, SAVE_ORGANIZATION } from "../constant/url-helper";

const initialState = {
    org: [],
    loading: false,
  }

  export const listOrganizations = createAsyncThunk(
    "organisations/listOrganizations",
    async (payload, thunk) => {
      try{
        console.log("PAYLOAD", payload);
        const res = await axiosTrail.post(LIST_ORGANIZATIONS, payload);
        if(res?.data){
            console.log("ORG", res);
          let decryptedResponse = decryptReactData(res?.data?.data, import.meta.env.VITE_ENCRYPTION_DECRYPTION_KEY);
        //   toast.success(decryptedResponse?.message);
          return decryptedResponse?.data; 
        }
      }
      catch(e){
        toast.error(e?.response?.data?.message);
        return thunk.rejectWithValue(e?.response?.data);
      }
    }
  );

  export const addOrganisation = createAsyncThunk(
    "organisations/addOrganisation",
    async (payload, thunk) => {
      try{
        const res = await axiosTrail.post(SAVE_ORGANIZATION, payload);
        if(res?.data){
          let decryptedResponse = decryptReactData(res?.data?.data, import.meta.env.VITE_ENCRYPTION_DECRYPTION_KEY);
          toast.success(decryptedResponse?.message);
        }
      }
      catch(e){
        toast.error(e?.response?.data?.message);
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
      // login
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
    },
  })
  
  export default organisationSlice.reducer