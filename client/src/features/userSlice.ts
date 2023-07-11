import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface UserState {
    email: string | null | undefined,
    idToken?: string,
}

const initialState: UserState = {
    email: null,
    idToken: undefined,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logGetInUser(state, action: PayloadAction<UserState>) {
            const { email, idToken } = action.payload;
            return { ...state, email, idToken };

        },
        logOut(state) {
            return { ...state, email: null, idToken: undefined };
        }
    }
});


export const {logGetInUser, logOut} = userSlice.actions;

export default userSlice.reducer;

