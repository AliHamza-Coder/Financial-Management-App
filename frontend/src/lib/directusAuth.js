import axios from "axios";

const DIRECTUS_URL = "http://localhost:8055"; // ✅ Base URL

// 🔹 Signup (Register User)
export const signup = async (email, password, first_name) => {
  try {
    const response = await axios.post(`${DIRECTUS_URL}/users`, {
      email,
      password,
      first_name,
    });

    return response.data;
  } catch (error) {
    console.error("Signup Error:", error.response?.data || error.message);
    throw error;
  }
};

// 🔹 Login (Get Access Token and Store It)
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${DIRECTUS_URL}/auth/login`, { email, password });
    const { access_token } = response.data;

    if (!access_token) {
      throw new Error("No access token received");
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("authToken", access_token);
    }

    return access_token;
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    throw error;
  }
};


// 🔹 Get Authenticated User
export const getUser = async (token) => {
  try {
    if (!token) {
      console.warn("No token provided.");
      return null;
    }

    const response = await axios.get(`${DIRECTUS_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Get User Error:", error.response?.data || error.message);
    return null;
  }
};


// 🔹 Logout (Clear Token)
export const logout = async () => {
  try {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("authToken");
    if (!token) return;

    await axios.post(
      `${DIRECTUS_URL}/auth/logout`,
      {}, // Empty object as required
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    localStorage.removeItem("authToken"); // ✅ Clear token
    return true;
  } catch (error) {
    console.error("Logout Error:", error.response?.data || error.message);
    throw error;
  }
};




// import axios from "axios";

// const DIRECTUS_URL = "http://localhost:8055"; // ✅ Correct Base URL

// // 🔹 Signup (Register User)
// export const signup = async (email, password, first_name) => {
//   try {
//     const response = await axios.post(`${DIRECTUS_URL}/users`, {
//       email,
//       password,
//       first_name,
//       // role: "fa79523c-5ca7-430f-9386-3df64bdee14f",
//     });

//     return response.data;
//   } catch (error) {
//     console.error("Signup Error:", error.response?.data || error.message);
//     throw error;
//   }
// };

// // 🔹 Login (Get Access Token)
// export const login = async (email, password) => {
//   try {
//     const response = await axios.post(`${DIRECTUS_URL}/auth/login`, {
//       email,
//       password,
//     });

//     return response.data; // { access_token, expires }
//   } catch (error) {
//     console.error("Login Error:", error.response?.data || error.message);
//     throw error;
//   }
// };

// // 🔹 Get Authenticated User
// export const getUser = async (token) => {
//   try {
//     const response = await axios.get(`${DIRECTUS_URL}/users/me`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     return response.data;
//   } catch (error) {
//     console.log("Get User Error:", error.response?.data || error.message);
//   }
// };

// // 🔹 Logout
// export const logout = async (token) => {
//   try {
//     await axios.post(
//       `${DIRECTUS_URL}/auth/logout`,
//       {}, // Empty object as required
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );

//     return true;
//   } catch (error) {
//     console.error("Logout Error:", error.response?.data || error.message);
//     throw error;
//   }
// };
