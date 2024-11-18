import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosTrail } from '../services/api';
import { LOGIN, LOGOUT, VERIFY_OTP } from '../constant/url-helper';
import toast from 'react-hot-toast';
import { clearLocal, get } from '../services/localStorage';
import { decryptReactData } from '../constant';

const initialState = {
  isAuthorize: get("access_token") ? true : false,
  user: null,
  loading: false,
}

export const login = createAsyncThunk(
  "auth/login",
  async (payload, thunk) => {
    try{
      const res = await axiosTrail.post(LOGIN, {
        email: payload?.email
      });
      if(res?.data){
        let decryptedResponse = decryptReactData(res?.data?.data, import.meta.env.VITE_ENCRYPTION_DECRYPTION_KEY);
        payload.cb(decryptedResponse?.data);
        toast.success(decryptedResponse?.message);
        return decryptedResponse; 
      }
    }
    catch(e){
      toast.error(e?.response?.data?.message);
      return thunk.rejectWithValue(e?.response?.data);
    }
  }
)

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (payload, thunk) => {
    try{
      const res = await axiosTrail.post(VERIFY_OTP, {
        otp: payload?.otp,
        id: payload?.id
      });
      if(res?.data){
        let decryptedResponse = decryptReactData(res?.data?.data, import.meta.env.VITE_ENCRYPTION_DECRYPTION_KEY);
        payload.cb(decryptedResponse?.data);
        toast.success(decryptedResponse?.message)
        return decryptedResponse;
      }
    }
    catch(e){
      toast.error(e?.response?.data?.message);
      return thunk.rejectWithValue(e?.response?.data);
    }
  }
)

export const resendOtp = createAsyncThunk(
  "auth/resendOtp",
  async (payload, thunk) => {
    try{
      const res = await axiosTrail.post(VERIFY_OTP, {
        id: payload?.id
      });
      if(res?.data){
        let decryptedResponse = decryptReactData(res?.data?.data, import.meta.env.VITE_ENCRYPTION_DECRYPTION_KEY);
        payload.cb(decryptedResponse?.data);
        toast.success(decryptedResponse?.message)
      }
    }
    catch(e){
      toast.error(e?.response?.data?.message);
      return thunk.rejectWithValue(e?.response?.data);
    }
  }
)

export const logout = createAsyncThunk(
  "auth/logout",
  async (payload, thunk) => {
    try{
      const res = await axiosTrail.get(LOGOUT);
      if(res?.data){
        let decryptedResponse = decryptReactData(res?.data?.data, import.meta.env.VITE_ENCRYPTION_DECRYPTION_KEY);
        clearLocal();
        toast.success(decryptedResponse?.message)
      }
    }
    catch(e){
      toast.error(e?.response?.data?.message);
      return thunk.rejectWithValue(e?.response?.data);
    }
  }
)

export const dummy = createAsyncThunk(
  "auth/dummy",
  async (payload, thunk) => {
    try{
      const res = await axiosTrail.get("/test");
      if(res?.data?.data){
        let decData = (decryptReactData(res?.data?.data, import.meta.env.VITE_ENCRYPTION_DECRYPTION_KEY))
        let parsedData;
        try {
          parsedData = JSON.parse(decData);
        } catch (e) {
            parsedData = decData; 
        }
        
        toast.success(res?.data?.message || "Success");
      }
    }
    catch(e){
      toast.error(e?.response?.data?.message || "Failed");
      return thunk.rejectWithValue(e?.response?.data);
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // },
  },
  extraReducers: (builder) => {
    // login
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload?.id || null;
    });
    builder.addCase(login.rejected, (state) => {
      state.loading = false;
    });

    // verifyOtp
    builder.addCase(verifyOtp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(verifyOtp.fulfilled, (state) => {
      state.loading = false;
      state.isAuthorize = true;
    });
    builder.addCase(verifyOtp.rejected, (state) => {
      state.loading = false;
      state.isAuthorize = false;
    });

    // logout
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.loading = false;
      state.isAuthorize = false;
    });
    builder.addCase(logout.rejected, (state) => {
      state.loading = false;
    });
  },
})

export default authSlice.reducer