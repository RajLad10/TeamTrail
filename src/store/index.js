import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import organisationSlice from './organisationSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    organisation: organisationSlice
  },
})