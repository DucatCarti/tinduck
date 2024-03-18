import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {UserProfile} from "../../types/UserData.ts"
import {$axios} from "../../api/axios.ts"

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
    return {user: JSON.parse(UserProfile)}
  } else {
    const response = await $axios.get("auth/profile")
    if (response.data?.user) {
      return {user: response.data.user}
    }
    if (response.data?.message) {
      return {message: response.data.message}
    }
  }
})

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateProfile: () => {
      localStorage.removeItem("user")
      getProfile()
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.loadingProfile = true
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        if (action.payload?.user) {
          state.profile = action.payload.user
          localStorage.setItem("user", JSON.stringify(action.payload.user))
        } else if (action.payload?.message) {
          state.errorProfile = action.payload.message
        } else {
          state.errorProfile = "Неизвестная ошибка. Тыкните клювом разработчика"
        }
        state.loadingProfile = false
        state.errorProfile = null
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.errorProfile =
          (action.error.message as string) || "Ошибка получения данных профиля"
      })
  },
})

export const {updateProfile} = authSlice.actions
export default authSlice.reducer
