import React, { useEffect } from "react";
import { useAuth } from "../Utility/authcontext";
import { getUser } from "../lib/directusAuth";

const Test = () => {
  const { token, } = useAuth(); // Access token and logout function

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        console.log("No token found.");
        return;
      }

      try {
        const userData = await getUser(token);
        console.log("User Data:", userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [token]);

  return (
    <div>
      <p>Check console for user data</p>
    </div>
  );
};

export default Test;
  