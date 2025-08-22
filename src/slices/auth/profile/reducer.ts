import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a proper type for user if known, otherwise use generic
type UserType = {
  first_name?: string;
  [key: string]: any;
};

interface ProfileState {
  error: string | null;
  success: string | null;
  user: UserType;
}

export const initialState: ProfileState = {
  error: null,
  success: null,
  user: {},
};

const ProfileSlice = createSlice({
  name: "Profile",
  initialState,
  reducers: {
    profileSuccess(state, action: PayloadAction<{ status: string; data: UserType }>) {
      state.success = action.payload.status;
      state.user = action.payload.data;
    },
    profileError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    editProfileChange(state) {
      // This does nothing right now — can be expanded as needed
      return state;
    },
    resetProfileFlagChange(state) {
      state.success = null;
    },
  },
});

export const {
  profileSuccess,
  profileError,
  editProfileChange,
  resetProfileFlagChange,
} = ProfileSlice.actions;

export default ProfileSlice.reducer;