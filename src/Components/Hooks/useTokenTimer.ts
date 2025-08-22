// src/hooks/useTokenExpiry.ts
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../slices/auth/login/thunk"; // update path if needed

const useTokenExpiry = () => {
// const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const expiry = localStorage.getItem("token_expiry");

    if (expiry) {
      const expiryTime = parseInt(expiry) * 1000; // convert to ms
      const now = Date.now();

      if (now >= expiryTime) {
        Cookies.remove("token");
        sessionStorage.removeItem("authUser");
        localStorage.removeItem("token_expiry");
        navigate("/login");
      } else {
        const timeUntilLogout = expiryTime - now;
        const timer = setTimeout(() => {
          Cookies.remove("token");
          sessionStorage.removeItem("authUser");
          localStorage.removeItem("token_expiry");
          navigate("/login");
        }, timeUntilLogout);

        return () => clearTimeout(timer);
      }
      }
      
// const handleStorage = (event: StorageEvent) => {
//   if (event.key === "logout" && event.newValue) {
//       dispatch(logoutUser(navigate))
//   }
// };

// window.addEventListener("storage", handleStorage);
// return () => window.removeEventListener("storage", handleStorage);

  }, [navigate]);
};

export default useTokenExpiry;





// src/hooks/useTokenExpiry.ts
// import { useEffect } from "react";
// import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";

// const useTokenExpiry = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = Cookies.get("token");

//     if (!token) return;

//     try {
//       const decoded: { exp: number } = jwtDecode(token);
//       const now = Date.now();
//       const expiry = decoded.exp * 1000;
//       const timeout = expiry - now;

//       if (timeout <= 0) {
//         handleLogout();
//         return;
//       }

//       const timer = setTimeout(() => {
//         handleLogout();
//       }, timeout);

//       const onStorageChange = (e: StorageEvent) => {
//         if (e.key === "logout-event") {
//           handleLogout();
//         }
//       };

//       window.addEventListener("storage", onStorageChange);

//       return () => {
//         clearTimeout(timer);
//         window.removeEventListener("storage", onStorageChange);
//       };
//     } catch (error) {
//       handleLogout();
//     }

//     function handleLogout() {
//       Cookies.remove("token");
//       sessionStorage.removeItem("authUser");
//       localStorage.setItem("logout-event", Date.now().toString()); // 🔄 notify other tabs
//       navigate("/auth-login");
//     }
//   }, []);
// };

// export default useTokenExpiry;
