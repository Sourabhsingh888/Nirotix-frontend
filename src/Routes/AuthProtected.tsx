import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthorization } from "../helpers/api_helper";
import { logoutUser } from "../slices/auth/login/thunk";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

interface AuthProtectedProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: any = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch {
    return true;
  }
};

const AuthProtected: React.FC<AuthProtectedProps> = ({
  allowedRoles = [], // ✅ default to empty array
  children,
}) => {
  const dispatch = useDispatch<any>();
  const [loading, setLoading] = useState(true); // ✅ wait before rendering
  const [role, setRole] = useState<string | null>(null);
  const token = Cookies.get("token");

  useEffect(() => {
    let detectedRole: string | null = null;

    try {
      const storedAuth = sessionStorage.getItem("authUser");
      if (storedAuth) {
        const parsed = JSON.parse(storedAuth);
        detectedRole = parsed?.user?.role || parsed?.role || null;
        console.log(detectedRole);
      }
    } catch (err) {
      console.error("Error parsing authUser from sessionStorage", err);
    }

    if (token && !isTokenExpired(token)) {
      setAuthorization(token);
      setRole(detectedRole);
    } else {
      Cookies.remove("token");
      sessionStorage.removeItem("authUser");
      dispatch(logoutUser());
    }

    setLoading(false);
  }, [dispatch, token]);

  // ⏳ Show nothing until role/token loaded
  if (loading) {
    return null;
  }

  // ⛔ Redirect if no token or expired
  if (!token || isTokenExpired(token)) {
    return <Navigate to="/login" replace />;
  }

  // 🔒 Role check only after role is known
  if (allowedRoles.length > 0 && (!role || !allowedRoles.includes(role))) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default AuthProtected;



// import React, { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import Unauthorized from "../pages/Auth/unauthorized/Unauthorized";
// import { useDispatch } from "react-redux";
// import { setAuthorization } from "../helpers/api_helper";
// import { useProfile } from "../Components/Hooks/UserHooks";
// import { logoutUser } from "../slices/auth/login/thunk";
// import { jwtDecode } from "jwt-decode";
// import Cookies from "js-cookie";

// interface AuthProtectedProps {
//   children: React.ReactNode;
//   allowedRoles?: string[]; // 👈 NEW
// }

// const isTokenExpired = (token: string): boolean => {
//   try {
//     const decoded: any = jwtDecode(token);
//     const currentTime = Math.floor(Date.now() / 1000);
//     return decoded.exp < currentTime;
//   } catch {
//     return true;
//   }
// };

// const AuthProtected: React.FC<AuthProtectedProps> = ({
//   children,
//   allowedRoles,
// }) => {
//   const dispatch = useDispatch<any>();
//   const [isValid, setIsValid] = useState(true);

//   const token = Cookies.get("token");
//   let role: string | null = null;

//   // Extract role from token
//   if (token) {
//     try {
//       const decoded: any = jwtDecode(token);
//       role = decoded.role || null;
//     } catch {
//       role = null;
//     }
//   }

//   useEffect(() => {
//     if (token && !isTokenExpired(token)) {
//       setAuthorization(token);
//       setIsValid(true);
//     } else {
//       Cookies.remove("token");
//       sessionStorage.removeItem("authUser");
//       dispatch(logoutUser());
//       setIsValid(false);
//     }
//   }, [dispatch, token]);

//   // Redirect if no token or expired
//   if (!token || isTokenExpired(token)) {
//     return <Navigate to="/login" replace />;
//   }

//   // 🔒 Role check
//   if (allowedRoles && role && !allowedRoles.includes(role)) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   // if (!allowedRoles) {
//   //   return <Unauthorized />;
//   // }

//   return <>{children}</>;
// };

// export default AuthProtected;
