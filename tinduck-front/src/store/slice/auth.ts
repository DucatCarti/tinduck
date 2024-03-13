import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {UserProfile} from "../../types/UserData.ts"
import {authAxios} from "../../api/axios.ts"

interface authState {
  loadingProfile: boolean
  errorProfile: null | string
  profile: UserProfile | null
  isAuth: boolean
}

const initialState: authState = {
  loadingProfile: false,
  errorProfile: null,
  profile: null,
  isAuth: false,
}

export const getProfile = createAsyncThunk("auth/getProfile", async () => {
  const UserProfile = localStorage.getItem("user")
  if (UserProfile) {
    return JSON.parse(UserProfile)
  } else {
    const response = await authAxios.get("profile")
    return response.data.user
  }
})

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.loadingProfile = true
        console.log("получем пользователя...")
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.profile = action.payload
        state.loadingProfile = false
        state.errorProfile = null
        console.log("получили пользователя!")
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.errorProfile =
          (action.error.message as string) || "Ошибка получения данных профиля"
      })
  },
})

export const {} = authSlice.actions
export default authSlice.reducer
