import axios from "axios";
import { clearLocal, get, set } from "./localStorage";
import { decryptReactData, encryptReactdata } from "../constant";

const API_URL_TRAIL = import.meta.env.VITE_APP_API_TRAIL_URL + 'api/v1';
let isRefreshing = false;
let failedQueue = [];
const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

class Axios {
  constructor(baseURL) {
    this.axios = axios.create({
      baseURL,
    });

    this.axios.interceptors.request.use(this._requestMiddleware);

    this.axios.interceptors.response.use(
      this._responseMiddleware,
      this._responseErr,
    );
  }

  _requestMiddleware = (req) => {
    let encryptedPayload = encryptReactdata(JSON.stringify(req.data), import.meta.env.VITE_ENCRYPTION_DECRYPTION_KEY);

    const token = get("access_token");
    if (token)
      req.headers.authorization = token.startsWith("Bearer ")
        ? token
        : "Bearer " + token;
    if (req?.method === "get") {
      return req
    }
    else {
      return { ...req, data: { data: encryptedPayload } };
    }
  };

  _responseMiddleware = (response) => {
    let decryptedResponse = decryptReactData(response?.data?.data, import.meta.env.VITE_ENCRYPTION_DECRYPTION_KEY);

    if (decryptedResponse?.data?.access_token) {
      set("access_token", encryptReactdata(JSON.stringify(decryptedResponse?.data?.access_token), import.meta.env.VITE_ENCRYPTION_DECRYPTION_KEY));
    }
    if (decryptedResponse?.data?.refresh_token) {
      set("refresh_token", encryptReactdata(JSON.stringify(decryptedResponse?.data?.refresh_token), import.meta.env.VITE_ENCRYPTION_DECRYPTION_KEY));
    }
    // return {...response, data: decryptedResponse?.data};
    return decryptedResponse;
  };

  // _responseErr = error => {
  //   if (
  //     error?.response?.data?.message?.toString().toLowerCase() ===
  //     "permission reverted"
  //   ) {
  //     window.location.replace("/");
  //   }
  //   if (error?.response?.status === 401) {
  //     // clear();
  //     clearLocal();
  //     // store.dispatch(logout());
  //     return Promise.reject(error);
  //   }
  //   return Promise.reject(error);
  // };

  _responseErr = async (error) => {
    let decryptedError = decryptReactData(error?.response?.data?.data, import.meta.env.VITE_ENCRYPTION_DECRYPTION_KEY);
    if (
      // error?.response?.data?.message?.toString().toLowerCase() ===
      decryptedError?.message?.toString().toLowerCase() ===
      "permission reverted"
    ) {
      // window.location.replace("/");
      return Promise.reject(error);
    }

    const originalRequest = error.config;
    if (error?.response?.status === 501 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return this.axios(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = get("refresh_token");
      try {
        const response = await axios.get(`${API_URL_TRAIL}/get-tokens`, {
          headers: {
            'Authorization': `Bearer ${refreshToken}`,
          }
        });
        const decResponse = decryptReactData(response?.data?.data, import.meta.env.VITE_ENCRYPTION_DECRYPTION_KEY);
        const newAccessToken = encryptReactdata(JSON.stringify(decResponse?.data?.access_token), import.meta.env.VITE_ENCRYPTION_DECRYPTION_KEY);
        const newRefreshToken = encryptReactdata(JSON.stringify(decResponse?.data?.refresh_token), import.meta.env.VITE_ENCRYPTION_DECRYPTION_KEY); //decResponse?.data?.refresh_token;
        // Update token in localStorage
        set("access_token", newAccessToken);
        set("refresh_token", newRefreshToken);
        processQueue(null, newAccessToken);

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return this.axios(originalRequest);
      } catch (err) {
        processQueue(err, null);
        clearLocal();
        // window.location.replace("/");
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject({...error, response: {data: decryptedError}});
  };
}

const axiosTrail = new Axios(API_URL_TRAIL).axios;

export { axiosTrail };
