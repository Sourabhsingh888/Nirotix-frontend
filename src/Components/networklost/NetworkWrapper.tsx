// src/components/NetworkWrapper.tsx
import React, { useState, useEffect } from "react";
import NoInternet from "../../pages/Admin/authentication/error/OffilnePage";

interface NetworkWrapperProps {
  children: React.ReactNode;
}

const NetworkWrapper: React.FC<NetworkWrapperProps> = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline ? <>{children}</> : <NoInternet />;
};

export default NetworkWrapper;
