//Include Both Helper File with needed methods
import {
  loginRequest,
  loginSuccess,
  logoutUserSuccess,
  apiError,
  reset_login_flag,
} from "./reducer";
import { getGeoLocation, getBrowserInfo } from "../../../helpers/utils/loginUtils";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode"; // ✅ default import
import Cookies from "js-cookie";
import { postJwtLogin } from "../../../helpers/auth_api_helper";
import { AppDispatch } from "../../../Store";

// Define types
interface UserLogin {
  email: string;
  password: string;
}

interface DecodedToken {
  exp: number;
  [key: string]: any;
}

interface GeoLocation {
  latitude: number;
  longitude: number;
}

// // Thunk: login user
// export const loginUser = (user: UserLogin, navigate: (path: string) => void) =>
//   async (dispatch: AppDispatch) => {
//     try {
//       dispatch(loginRequest());
//       const browser = getBrowserInfo();
//       const geo: GeoLocation = await getGeoLocation();
//       const response = await postJwtLogin({
//         email: user.email,
//         password: user.password,
//         browser,
//         latitude: geo.latitude,
//         longitude: geo.longitude,
//       });
//       console.log("response", response);

//       if (response?.token) {
//         const decoded = jwtDecode<DecodedToken>(response.token);

//         const expiryInSeconds = decoded.exp - Math.floor(Date.now() / 1000); // seconds left
//         const expiryInDays = expiryInSeconds / 86400; // convert to days

//         // ✅ Store expiry in localStorage
//         localStorage.setItem("token_expiry", decoded.exp.toString());

//         // ✅ Save token in cookie
//         Cookies.set("token", response.token, {
//           secure: true,
//           sameSite: "Strict",
//           expires: expiryInDays, // Cookie expiry in days
//         });

//         // ✅ Save user in session
//         sessionStorage.setItem("authUser", JSON.stringify(response));
//         toast.success(response.message);
//         dispatch(loginSuccess(response));-

//         // ✅ Auto logout after expiry
//         setTimeout(() => {
//           dispatch(logoutUser(navigate));
//         }, expiryInSeconds * 1000);

//         // ✅ Role-based navigation
//         if (response.user.role === "admin") {
//           navigate("/admin-dashboard");
//         } else {
//           navigate("/user-dashboard");
//         }
//       } else {
//         toast.error("asdfghj", response.message);
//       }
//     } catch (error: any) {
//       dispatch(apiError(error.message || "Login failed"));
//       // toast.error("asdfghj",error.message);
//     }
//   };

// Thunk: login user
export const loginUser = (user: UserLogin, navigate: (path: string) => void) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(loginRequest());
      const browser = getBrowserInfo();
      const geo: GeoLocation = await getGeoLocation();

      const response = await postJwtLogin({
        email: user.email,
        password: user.password,
        browser,
        latitude: geo.latitude,
        longitude: geo.longitude,
      });

      console.log("response", response);

      // ✅ Handle failure case (backend sends success=false)
      if (!response?.success) {
        toast.error(response.message || "Login failed");
        dispatch(apiError(response.message || "Login failed"));

              // reset after toast
  setTimeout(() => {
    dispatch(reset_login_flag());
  }, 3000);
  return;
}

      // ✅ If login success & token present
      if (response?.token) {
        const decoded = jwtDecode<DecodedToken>(response.token);

        const expiryInSeconds = decoded.exp - Math.floor(Date.now() / 1000); // seconds left
        const expiryInDays = expiryInSeconds / 86400; // convert to days

        // ✅ Store expiry in localStorage
        localStorage.setItem("token_expiry", decoded.exp.toString());

        // ✅ Save token in cookie
        Cookies.set("token", response.token, {
          secure: true,
          sameSite: "Strict",
          expires: expiryInDays, // Cookie expiry in days
        });

        // ✅ Save user in session
        sessionStorage.setItem("authUser", JSON.stringify(response));

        dispatch(loginSuccess(response));
        toast.success(response.message || "Login successful");

        // Reset flag after a short delay so UI doesn't persist success/error state
        setTimeout(() => {
          dispatch(reset_login_flag());
        }, 3000);

        // ✅ Auto logout after expiry
        setTimeout(() => {
          dispatch(logoutUser(navigate));
        }, expiryInSeconds * 1000);

        // ✅ Role-based navigation
        if (response.user?.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/user-dashboard");
        }
      } else {
        toast.error("Login failed: No token received");
        dispatch(apiError("Login failed: No token received"));
      }
    } catch (error: any) {
      const msg = error?.message || error.message || "Login failed";
      toast.error(msg);
      dispatch(apiError(msg));
    }
  };



// Thunk: logout user
export const logoutUser =
  (navigate?: (path: string) => void) =>
  async (dispatch: AppDispatch) => {
    try {
      // ✅ Clear storage
      Cookies.remove("token");
      sessionStorage.removeItem("authUser");
      localStorage.removeItem("token_expiry");

      // ✅ Notify other tabs
      localStorage.setItem("logout", Date.now().toString());

      // ✅ Update Redux
     dispatch(logoutUserSuccess());
     setTimeout(() => {
       dispatch(reset_login_flag());
     }, 1000);


      // ✅ Navigate
      if (navigate) {
        navigate("/login");
      } else {
        window.location.href = "/login";
      }
    } catch (error: any) {
      dispatch(apiError(error.message || "Logout failed"));
    }
  };