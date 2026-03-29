'use client';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails, clearUserDetails } from "@/redux/slices/userSlice";
import { setreports, clearreports } from "@/redux/slices/reportSlice";
import { logoutAndClearTimer } from "@/redux/slices/authSlice";
import type { AppDispatch } from "../redux/store";
import { RootState } from "../redux/store";
import { isTokenExpired } from "@/utils";
import { apiBaseURL } from "../utils";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const access = useSelector((state: RootState) => state.auth.accessToken);

  const fetchUserDetails = async (token: string) => {
    try {
      const res = await fetch(`${apiBaseURL}/user/details`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.user_details) dispatch(setUserDetails(data.user_details));
      }
    } catch (err) { console.error("User sync error:", err); }
  };

  const fetchreports = async (token: string) => {
    try {
      const res = await fetch(`${apiBaseURL}/user/reports`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.reports) dispatch(setreports(data.reports));
      }
    } catch (err) { console.error("Report sync error:", err); }
  };

  useEffect(() => {
    const syncSession = async () => {
      if (!access || isTokenExpired(access)) {
        dispatch(logoutAndClearTimer());
        dispatch(clearUserDetails());
        dispatch(clearreports());
        return;
      }
      await fetchUserDetails(access);
      await fetchreports(access);
    };
    syncSession();
  }, [dispatch, access]);

  return (
    <>
      <title>FinXplain AI | Fiscal Intelligence Engine</title>
      <main className="selection:bg-teal-100 selection:text-teal-900">
        {children}
      </main>
    </>
  );
};

export default Layout;