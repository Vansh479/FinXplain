"use client";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { isTokenExpired } from "@/utils";
import { useEffect, useState } from "react";

const withGuest = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const GuestComponent = (props: P) => {
    const router = useRouter();
    const token = useSelector((state: RootState) => state.auth.accessToken);
    const [checkedAuth, setCheckedAuth] = useState(false);

    useEffect(() => {
      const isLoggedIn = token && !isTokenExpired(token);

      if (isLoggedIn) {
        router.replace("/analysis");
      } else {
        setCheckedAuth(true);
      }
    }, [token, router]);

    if (!checkedAuth) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return GuestComponent;
};

export default withGuest;