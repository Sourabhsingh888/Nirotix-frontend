import { postJwtRegister } from "../../../helpers/auth_api_helper";
import { toast } from "react-toastify";

// actions
import {
  registerUserSuccessful,
  registerUserFailed,
  resetRegisterFlagChange,
} from "./reducer";

// Register user thunk
export const registerUser = (user: any) => async (dispatch: any) => {
  try {
    // Optional: dispatch a loading state here if needed

    const response = await postJwtRegister('/post-jwt-register', user);

    // Dispatch success action
    dispatch(registerUserSuccessful(response));

    // Optional: show success toast
    toast.success("Registration successful!");
  } catch (error: any) {
    // Dispatch error action
    dispatch(registerUserFailed(error?.message || "Registration failed"));

    // Optional: show error toast
    toast.error(error?.message || "Something went wrong during registration.");
  }
};

// Reset register flags (usually used after form submission)
export const resetRegisterFlag = () => (dispatch: any) => {
  dispatch(resetRegisterFlagChange());
};
