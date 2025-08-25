import { createSlice } from "@reduxjs/toolkit";

const userReducer = createSlice({
    name : "user",
    initialState : {
        name : "",
        email : "",
        role : "",
    },
    reducers : {
        handleSetUserDetails : (state , action) => {
            state.name = action?.payload?.name
            state.email = action?.payload?.email
            state.role = action?.payload?.role
        },
        handleDeleteUser : (state , action) => {
            state.name = ""
            state.email = ""
            state.role = ""
        }
    }
})

export const { handleSetUserDetails, handleDeleteUser } = userReducer.actions;

export default userReducer.reducer;