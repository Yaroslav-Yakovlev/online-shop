import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface UserState {
    name?: string,
    email: string | null | undefined,
    idToken?: string | undefined,
    role?: string | undefined,
    _id?: string | undefined,
}

const initialState: UserState = {
    name: '',
    email: null,
    idToken: undefined,
    role: 'subscriber',
    _id: undefined,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logGetInUser(state, action: PayloadAction<UserState>) {
            const { name, email, idToken, role, _id } = action.payload;
            return { ...state, name, email, idToken, role, _id };

        },
        logOut() {
            return {
                name: '',
                email: null,
                idToken: undefined,
                role: 'subscriber',
                _id: '',
            };
        }
    }
});


export const {logGetInUser, logOut} = userSlice.actions;

export default userSlice.reducer;

