import React,{useEffect} from "react";
// import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
import "./assets/scss/themes.scss";
import NetworkWrapper from "./Components/networklost/NetworkWrapper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./Routes";
import useTokenExpiry from "./Components/Hooks/useTokenTimer";

function App() {
    useTokenExpiry();
  useEffect(() => {

    const onStorageChange = (event: StorageEvent) => {
      if (event.key === "logout") {
        // Token/user removed, force redirect
        window.location.href = "/login";
      }
    };

    window.addEventListener("storage", onStorageChange);

    return () => {
      window.removeEventListener("storage", onStorageChange);
    };
  }, []);

  // const navigate = useNavigate();
  // useEffect(() => {
  //   // Token expiry check on load
  //   const expiry = localStorage.getItem("token_expiry");
  //   if (expiry) {
  //     const expiryTime = parseInt(expiry) * 1000; // convert to ms
  //     const now = Date.now();

  //     if (now >= expiryTime) {
  //       Cookies.remove("token");
  //       sessionStorage.removeItem("authUser");
  //       localStorage.removeItem("token_expiry");
  //       navigate("/auth-login");
  //     } else {
  //       const timeUntilLogout = expiryTime - now;
  //       setTimeout(() => {
  //         Cookies.remove("token");
  //         sessionStorage.removeItem("authUser");
  //         localStorage.removeItem("token_expiry");
  //         navigate("/auth-login");
  //       }, timeUntilLogout);
  //     }
  //   }

  //   // // Listen for logout in other tabs
  //   // const handleStorage = (event: StorageEvent) => {
  //   //   if (event.key === "logout") {
  //   //     Cookies.remove("token");
  //   //     sessionStorage.removeItem("authUser");
  //   //     navigate("/auth-login");
  //   //   }
  //   // };

  //   // window.addEventListener("storage", handleStorage);
  //   // return () => window.removeEventListener("storage", handleStorage);
  // }, [navigate]);

  return (
    <React.Fragment>
      <NetworkWrapper>
        <AppRoutes />
      </NetworkWrapper>
      <ToastContainer />
    </React.Fragment>
  );
}

export default App;