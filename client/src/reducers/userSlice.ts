import {createSlice, PayloadAction} from "@reduxjs/toolkit";

// export interface user {
//
// }

const initialState: any = {};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logGetUser(state, action: PayloadAction) {
            return action.payload;
        },
        logOut(state, action: PayloadAction) {
            return action.payload
        }
    }
})

export default userSlice.reducer;







// export const userReducer = (state = null, action) => {
//     switch (action.type) {
//         case "LOGGED_IN_USER":
//             return action.payload;
//         case "LOGOUT":
//             return action.payload;
//         default:
//             return state;
//     }
// };
