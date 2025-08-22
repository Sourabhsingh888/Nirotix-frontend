// loginUtils.ts

export const getBrowserInfo = (): string => {
  const userAgent = navigator.userAgent;

  if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) return "Chrome";
  if (userAgent.includes("Firefox")) return "Firefox";
  if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) return "Safari";
  if (userAgent.includes("Edg")) return "Edge";

  return "Unknown";
};

export const getGeoLocation = (): Promise<{ latitude: number; longitude: number }> => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      console.warn("Geolocation not supported.");
      return resolve({ latitude: 0, longitude: 0 }); // fallback if not supported
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.warn("Geolocation error:", error.message);
        resolve({ latitude: 0, longitude: 0 }); // fallback if user denies or error
      }
    );
  });
};