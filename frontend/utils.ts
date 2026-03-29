import { store } from "./redux/store";
import { logoutAndClearTimer } from "./redux/slices/authSlice";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp: number;
  [key: string]: any;
}

 export const apiBaseURL = "https://finxplain.onrender.com"; 
// export const apiBaseURL = "http://localhost:8000";

export const fetchWithAuth = async (url: string, options: RequestInit = {}): Promise<Response> => {
    const state = store.getState();
    
    const accessToken = state.auth.accessToken;

    const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...options.headers,
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    };

    let response = await fetch(url, {
        ...options,
        headers,
    });

    if (response.status === 401) {
        console.warn("Session Expired or Unauthorized. Re-authenticating...");
        store.dispatch(logoutAndClearTimer());
    }
    return response;
};

export const isTokenExpired = (token: string): boolean => {
  if (!token) return true;
  try {
    const decoded: DecodedToken = jwtDecode(token);
    const now = Math.floor(Date.now() / 1000); 
    return decoded.exp < now;
  } catch (e) {
      return true;
  }
};