import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "@/styles/globals.css";
import { DataProvider } from "../Utility/DataContext";
import { AuthProvider } from "../Utility/authContext";

export default function App({ Component, pageProps }) {
  const [auth, setAuth] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      setAuth(!!token); // Set auth state based on token availability
    }
  }, [router.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setAuth(false);
    router.push("/login");
  };

  return (
    <AuthProvider>
      <DataProvider>
        <div>
          {auth && (
            <button
              onClick={handleLogout}
              style={{
                position: "absolute",
                top: 15,
                right: 30,
                backgroundColor: "#007bff",
                color: "white",
                padding: "8px 16px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          )}
          <Component {...pageProps} />
        </div>
      </DataProvider>
    </AuthProvider>
  );
}
