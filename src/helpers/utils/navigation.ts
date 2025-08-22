// // utils/navigation.ts
// let navigateFn: (path: string) => void;

// export const setNavigate = (navigate: (path: string) => void) => {
//   navigateFn = navigate;
// };

// export const navigateTo = (path: string) => {
//   if (navigateFn) {
//     navigateFn(path);
//   } else {
//     window.location.href = path; // fallback
//   }
// };



let navigateFn: ((path: string) => void) | null = null;
let pendingPath: string | null = null;

export const setNavigate = (navigate: (path: string) => void) => {
  navigateFn = navigate;

  // 🔁 If a redirect was queued before navigateFn was available
  if (pendingPath) {
    navigateFn(pendingPath);
    pendingPath = null;
  }
};

export const navigateTo = (path: string) => {
  console.log("🔁 navigateTo called with:", path);
  if (navigateFn) {
     console.log("✅ Using navigate()");
    navigateFn(path);
  } else {
    console.log("⏳ Delaying navigation. Storing pendingPath:", path);
    pendingPath = path; // ⏳ Delay the redirect
  }
};
