import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useSelector } from "react-redux" 
import authReducer from "./features/auth-slice"

export const store = configureStore({ 
    reducer: /* A function that takes in a action */ {
        auth: authReducer,
    },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;