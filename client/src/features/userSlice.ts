import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface UserState {
    email: string | null | undefined,
    idToken?: string,
}

const initialState: UserState = {
    email: '',
    idToken: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logGetInUser(state, action: PayloadAction<UserState>) {
            const {email, idToken} = action.payload;

            state.email = email;
            state.idToken = idToken;
        },
        logOut(state, action: PayloadAction<UserState>) {
            const {email, idToken} = action.payload;

            state.email = email;
            state.idToken = idToken;
        }
    }
});


export const {logGetInUser, logOut} = userSlice.actions;

export default userSlice.reducer;

