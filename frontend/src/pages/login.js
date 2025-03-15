"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ReactTyped } from "react-typed";
import styles from "../styles/login.module.css";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
        const res = await axios.post("http://localhost:8055/auth/login", {
            email: formData.email,
            password: formData.password
        });

        // Fix: Correct token path
        if (res.data?.data?.access_token) {
            localStorage.setItem("authToken", res.data.data.access_token);
            router.push("/dashboard");
        } else {
            throw new Error("Invalid credentials");
        }
    } catch (err) {
        setError(err.response?.data?.message || "Invalid password or email"); 
    }
};



  return (
    <div className={styles.loginContainer}>
      {/* Left Side */}
      <div className={styles.loginLeft}>
        <div className={styles.animatedTyping}>
          <div className={styles.staticText}>Your financial future is </div>
          <ReactTyped
            strings={[
              "Secure.",
              "in your hands.",
              "built with smart decisions.",
              "just a plan away."
            ]}
            typeSpeed={50}
            backSpeed={50}
            loop
          />
        </div>
        <p className={styles.description}>
          Take control of your finances with Finova. Track your expenses, set savings goals, and make smarter financial decisions—all in one place.
        </p>
      </div>

      {/* Right Side */}
      <div className={styles.loginRight}>
        <h2 className={styles.loginTitle}>Login Account</h2>
        <p className={styles.loginDescription}>Please enter your credentials to log in.</p>

        {error && <p className={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <input type="email" name="email" placeholder="Email ID" onChange={handleChange} required className={styles.input} />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required className={styles.input} />

          <div className={styles.options}>
            <label>
              <input type="checkbox" /> Keep me signed in
            </label>
            <a href="#" className={styles.link} onClick={() => router.push("/signup")}>Don't have an account? Sign up</a>
          </div>

          <button type="submit" className={styles.button}>LOGIN</button>
        </form>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>&copy; {new Date().getFullYear()} Finova. All rights reserved.</p>
          <p>IPS Technologies Pvt Ltd</p>
        </div>
      </footer>
    </div>
  );
};

export default Login;
