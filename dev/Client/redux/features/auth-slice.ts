import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { LogOut } from "lucide-react"
import { log } from "node:console"

type InitialState = {
  value: AuthState
}

type AuthState = {
  isAuth: boolean
  username: string
  uid: string
  isModerator: boolean
}

/* This  */
const initialState = {
  value: {
    isAuth: false,
    username: "",
    uid: "",
    isModerator: false,
  } as AuthState,
} as InitialState

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: { /* A function that takes in a action */
    logOut: () => {
        return initialState;
    },
    logIn: (state, action: PayloadAction<string>) => {
        return {
            value: {
                isAuth: true,
                username: action.payload,
                uid: "1234567890",
                isModerator: false,
            },
        };
    },
  },
})

export const { logOut, logIn } = auth.actions
export default auth.reducer