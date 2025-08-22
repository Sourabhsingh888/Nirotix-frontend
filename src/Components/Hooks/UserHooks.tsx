import { useEffect, useState } from "react";
import { getLoggedinUser } from "../../helpers/api_helper";

const useProfile = () => {
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const sessionUser = getLoggedinUser();
      const sessionToken = sessionUser?.token || null;

      setUserProfile(sessionUser || null);
      setToken(sessionToken);
      setLoading(false);
    }, 200); // Wait 200ms for async storage update

    return () => clearTimeout(timeout);
  }, []);

  return { userProfile, loading, token };
};

export { useProfile };

// import { useEffect, useState } from "react";
// import { getLoggedinUser } from "../../helpers/api_helper";

// const useProfile = () => {
//   const [userProfile, setUserProfile] = useState(() => getLoggedinUser());
//   const [loading, setLoading] = useState(!userProfile);

//   const token = userProfile?.token;

//   useEffect(() => {
//     const user = getLoggedinUser();
//     setUserProfile(user);
//     setLoading(!user?.token);
//   }, []);

//   return { userProfile, loading, token };
// };

// export { useProfile };

// import { useEffect, useState } from "react";
// import { getLoggedinUser } from "../../helpers/api_helper";

// const useProfile = () => {
//   const userProfileSession = getLoggedinUser();
//   var token =
//   userProfileSession &&
//   userProfileSession["token"];
//   const [loading, setLoading] = useState(userProfileSession ? false : true);
//   const [userProfile, setUserProfile] = useState(
//     userProfileSession ? userProfileSession : null
//   );

//   useEffect(() => {
//     const userProfileSession = getLoggedinUser();
//     var token =
//       userProfileSession &&
//       userProfileSession["token"];
//     setUserProfile(userProfileSession ? userProfileSession : null);
//     setLoading(token ? false : true);
//   }, []);

//   return { userProfile, loading,token };
// };

// export { useProfile };
