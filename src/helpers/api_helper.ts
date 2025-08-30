// helpers/api_helper.tsx
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { navigateTo } from "../helpers/utils/navigation";
import config from "../config";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const { api } = config;

// Base URL + headers
axios.defaults.baseURL = api.API_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";

// Request Interceptor — Attach token + check expiry
axios.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = Cookies.get("token");

  if (token) {
    try {
      const decoded: any = jwtDecode(token);
      const isExpired = decoded.exp * 1000 < Date.now();
      

// inside request interceptor
if (isExpired) {
  Cookies.remove("token");
  sessionStorage.removeItem("authUser");
  toast.error("Session expired. Please log in again");

  if (window.location.pathname !== "/login") {
    console.log("Token expired. Redirecting to login...");
    navigateTo("/login"); // 👈 use navigateTo
  }

  throw new axios.Cancel("Token expired");
}
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };

    } catch (err) {
      // Invalid token (manipulated or corrupted)
      Cookies.remove("token");
      sessionStorage.removeItem("authUser");
      toast.error("Invalid session. Please log in again");

      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }

      throw new axios.Cancel("Invalid token");
    }
  }

  return config;
});

// Response Interceptor — Handle 401 and other errors
axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data ? response.data : response;
  },
  (error) => {
    const status = error?.response?.status;
    let message = "An error occurred";

    switch (status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Unauthorized - Please log in again";
        Cookies.remove("token");
        sessionStorage.removeItem("authUser");
        toast.error("Session expired. Please log in again"); 
        if (window.location.pathname !== "/login") {
            navigateTo("/login");
        }
        break;
      case 404:
        message = "Data not found";
        break;
        default:
        message =
        error?.response?.data?.message || error.message || "Unknown error";
    }
    return Promise.reject({
      status,
      message,
      details: error?.response?.data,
    });
  }
);

// Manually set Authorization header if needed
const setAuthorization = (token: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// API Client wrapper
class APIClient {
  get = (url: string, params?: any, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
    if (params) {
      // const query = Object.keys(params).map(key => `${key}=${params[key]}`).join("&");
      // url += `?${query}`;
      const query = new URLSearchParams(params).toString();
      url += `?${query}`;
    }
    return axios.get(url, config);
  };

  create = (url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
    //  if data is FormData, remove content-type header
    if (data instanceof FormData) {
      return axios.post(url, data, {
        ...config,
        headers: {
          ...config?.headers,
          "Content-Type": "multipart/form-data",
        },
      });
    }
    // default JSON request
    return axios.post(url, data, config);
  };

update = (url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
  if (data instanceof FormData) {
    return axios.patch(url, data, {
      ...config,
      headers: {
        ...config?.headers,
        "Content-Type": "multipart/form-data",
      },
    });
  }
  return axios.patch(url, data, config);
};


put = (url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
  if (data instanceof FormData) {
    return axios.put(url, data, {
      ...config,
      headers: {
        ...config?.headers,
        "Content-Type": "multipart/form-data",
      },
    });
  }
  return axios.put(url, data, config);
};

  
  delete = (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
    return axios.delete(url, config);
  };
}

// Get user from sessionStorage
const getLoggedinUser = () => {
  const user = sessionStorage.getItem("authUser");
  return user ? JSON.parse(user) : null;
};

export { APIClient, setAuthorization, getLoggedinUser };




// import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
// import config from "../config";

// const { api } = config;

// // default
// axios.defaults.baseURL = api.API_URL;
// // content type
// axios.defaults.headers.post["Content-Type"] = "application/json";

// // content type
// const authUser: any = sessionStorage.getItem("authUser")
// const token = JSON.parse(authUser) ? JSON.parse(authUser).token : null;
// if (token)
//   axios.defaults.headers.common["Authorization"] = "Bearer " + token;

// // intercepting to capture errors
// axios.interceptors.response.use(
//   function (response) {
//     return response.data ? response.data : response;
//   },
//   function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     let message;
//     switch (error.status) {
//       case 500:
//         message = "Internal Server Error";
//         break;
//       case 401:
//         message = "Invalid credentials";
//         break;
//       case 404:
//         message = "Sorry! the data you are looking for could not be found";
//         break;
//       default:
//         message = error.message || error;
//     }
//     return Promise.reject(message);
//   }
// );
// /**
//  * Sets the default authorization
//  * @param {*} token
//  */
// const setAuthorization = (token : any) => {
//   axios.defaults.headers.common["Authorization"] = "Bearer " + token;
// };

// class APIClient {
//   /**
//    * Fetches data from given url
//    */

//   //  get = (url, params) => {
//   //   return axios.get(url, params);
//   // };
//   get = (url : any, params : any) => {
//     let response;

//     let paramKeys : any = [];

//     if (params) {
//       Object.keys(params).map(key => {
//         paramKeys.push(key + '=' + params[key]);
//         return paramKeys;
//       });

//       const queryString = paramKeys && paramKeys.length ? paramKeys.join('&') : "";
//       response = axios.get(`${url}?${queryString}`, params);
//     } else {
//       response = axios.get(`${url}`, params);
//     }

//     return response;
//   };
//   /**
//    * post given data to url
//    */
//   create = (url : any, data : any) => {
//     return axios.post(url, data);
//   };
//   /**
//    * Updates data
//    */
//   update = (url : any, data : any) => {
//     return axios.patch(url, data);
//   };

//   put = (url : any, data : any) => {
//     return axios.put(url, data);
//   };
//   /**
//    * Delete
//    */
//   delete = (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
//     return axios.delete(url, { ...config });
//   };
// }
// const getLoggedinUser = () => {
//   const user = sessionStorage.getItem("authUser");
//   if (!user) {
//     return null;
//   } else {
//     return JSON.parse(user);
//   }
// };

// export { APIClient, setAuthorization, getLoggedinUser };