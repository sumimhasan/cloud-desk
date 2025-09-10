import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";

// --------------------
// Axios Instance Setup
// --------------------
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3000/api",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// --------------------
// Request Interceptor
// --------------------
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        (config.headers as Record<string, string>).Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// --------------------
// Response Interceptor
// --------------------
api.interceptors.response.use(
  (response) => response.data, // 👈 unwraps data
  (error: AxiosError) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// --------------------
// API Bridge
// --------------------
export async function APIBridge<T = unknown>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> {
  switch (method) {
    case "GET":
      return api.get<T, T>(url, config); // 👈 override generic: <T, R = T>
    case "POST":
      return api.post<T, T>(url, data, config);
    case "PUT":
      return api.put<T, T>(url, data, config);
    case "DELETE":
      return api.delete<T, T>(url, config);
    default:
      throw new Error("Unsupported method");
  }
}
