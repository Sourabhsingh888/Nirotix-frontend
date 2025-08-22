import React from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // 👈 import Navigate

//Layouts
import NonAuthLayout from "../Layouts/NonAuthLayout";
import VerticalLayout from "../Layouts/index";
import AuthProtected from "./AuthProtected" 

//routes
import { authProtectedRoutes, publicRoutes } from "./allRoutes";

const Index = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route>
          {publicRoutes.map((route: any, idx: any) => (
            <Route
              path={route.path}
              element={<NonAuthLayout>{route.component}</NonAuthLayout>}
              key={idx}
              index={route.index || false}
            />
          ))}
        </Route>

        <Route>
          {authProtectedRoutes.map((route: any, idx: any) => (
            <Route
              path={route.path}
              element={
                <AuthProtected allowedRoles={route.allowedRoles}>
                  <VerticalLayout>{route.component}</VerticalLayout>
                </AuthProtected>
              }
              key={idx}
              index={route.index || false}
            />
          ))}
        </Route>
        {/* 🔁 Catch-all Fallback Route — MUST be last */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </React.Fragment>
  );
};

export default Index;
