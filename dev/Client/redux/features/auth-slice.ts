import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type InitialState = {
  value: AuthState
}

export type AuthState = {
  isAuth: boolean
  id: number | null
  username: string
  email: string
  isModerator: boolean
}

type LoginPayload = {
  id: number
  username: string
  email: string
}

const initialState: InitialState = {
  value: {
    isAuth: false,
    id: null,
    username: "",
    email: "",
    isModerator: false,
  },
}

export const auth = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logOut: () => {
      return initialState
    },

    logIn: (state, action: PayloadAction<LoginPayload>) => {
      state.value.isAuth = true
      state.value.id = action.payload.id
      state.value.username = action.payload.username
      state.value.email = action.payload.email
    },
  },
})

export const { logOut, logIn } = auth.actions

export default auth.reducer
