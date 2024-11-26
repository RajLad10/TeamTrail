import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import organisationSlice from './organisationSlice'
import profileSlice from './profileSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    organisation: organisationSlice,
    profile: profileSlice
  },
})