import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    id: string;
    username: string;
    email: string;
    fi_title: string; // Legacy Key: Will refactor to professionalRole later
    research_focus: string;       // Legacy Key: Will refactor to researchFocus later
    location: string;  // To be removed in final cleanup
}

const initialState: UserState = {
    id: "",
    username: "",
    email: "",
    fi_title: "",
    research_focus: "",
    location: "",
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails(state, action: PayloadAction<UserState>) {
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.fi_title = action.payload.fi_title;
            state.research_focus = action.payload.research_focus;
            state.location = action.payload.location;
        },
        clearUserDetails(state) {
            return initialState;
        },
    },
});

export const { setUserDetails, clearUserDetails } = userSlice.actions;
export default userSlice.reducer;