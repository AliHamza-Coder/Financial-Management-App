'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from '../styles/signup.module.css';
import { ReactTyped } from 'react-typed';

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmpassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8055/users', {
        first_name: formData.fullname,
        email: formData.email,
        password: formData.password,
      });
      alert('Account created successfully!');
      router.push('/login');
    } catch (err) {
      alert(`Error: ${err.response?.data?.message || 'Something went wrong!'}`);
    }
  };

  return (
    <div className={styles.signupContainer}>
      {/* Left Side */}
      <div className={styles.signupLeft}>
        <div className={styles.animatedTyping}>
          <div>Your financial future is</div>
          <ReactTyped
            strings={['Secure.', 'In your hands.', 'Built with smart decisions.', 'Just a plan away.']}
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
      <div className={styles.signupRight}>
        <h2>Create Account</h2>
        <p className={styles.signupDescription}>Please enter your details to create an account.</p>
        <form className={styles.signupForm} onSubmit={handleSubmit}>
          <input type='text' placeholder='Full Name' name='fullname' onChange={handleChange} required />
          <input type='email' placeholder='Email ID' name='email' onChange={handleChange} required />
          <input type='password' placeholder='Password' name='password' onChange={handleChange} required />
          <input type='password' placeholder='Confirm Password' name='confirmpassword' onChange={handleChange} required />
          
          <div className={styles.checkboxContainer}>
            <input type='checkbox' id='terms' required />
            <label htmlFor='terms'>I agree to Terms & Conditions</label>
          </div>
          
          <button type='submit'>SIGN UP</button>
          <p className={styles.loginLink}>Already a member? <a href='/login'>Login</a></p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
