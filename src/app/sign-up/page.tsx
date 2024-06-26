"use client";

import { useState } from "react";
import clsx from "clsx";
import styles from "./page.module.css";
import { Newsreader } from "next/font/google";
import Link from "next/link";
import { handleSubmit } from "./action";

const newsreader = Newsreader({
  weight: "700",
  subsets: ["latin"],
});

interface User {
  names: string;
  email: string;
  password: string;
  role: string;
}

export default function SignUp() {
  const [user, setUser] = useState<User>({
    names: "",
    email: "",
    password: "",
    role: "customer",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleRoleChange = (selectedRole: string) => {
    setUser({ ...user, role: selectedRole });
  };

  const submitAnswer = async () => {
    const answer = await handleSubmit(confirmPassword, user);
    if (typeof answer === "string") {
      setMessage(answer);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.leftSection}>
        <h1 className={clsx(newsreader.className, styles.heading)}>
          Come, Join Us
        </h1>
        <div className={styles.textContainer}>
          <p className={styles.text}>
            More than 10,000 stores, with hundreds of articles are waiting for
            you. Enjoy our 50% promo coupon upon subscription.
          </p>
          <p className={styles.text}>
            Are you a merchant and wish to expand your business?
            <br />
            Join us, and sell your product to hundreds of thousands of customers
            from all around the world.
          </p>
        </div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.rightSectionContainer}>
          <h1
            className={clsx(
              newsreader.className,
              styles.heading,
              styles.rightHeading,
            )}
          >
            Create Account
          </h1>
          <div className={styles.fieldsContainer}>
            <div className={styles.fieldContainer}>
              <input
                className={styles.input}
                placeholder="Names"
                name="names"
                value={user.names}
                onChange={handleChange}
              />
            </div>
            <div className={styles.fieldContainer}>
              <input
                className={styles.input}
                placeholder="Email"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            </div>
            <div className={styles.fieldContainer}>
              <input
                className={styles.input}
                type="password"
                placeholder="Password"
                name="password"
                value={user.password}
                onChange={handleChange}
              />
            </div>
            <div className={styles.fieldContainer}>
              <input
                className={styles.input}
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </div>
            <h4 className={styles.categoryTitle}>Choose a category</h4>
            <div className={styles.category}>
              <div
                className={clsx(styles.categoryContainer, {
                  [styles.categoryContainerActive]: user.role === "customer",
                })}
                onClick={() => handleRoleChange("customer")}
              >
                Customer
              </div>
              <div
                className={clsx(styles.categoryContainer, {
                  [styles.categoryContainerActive]: user.role === "owner",
                })}
                onClick={() => handleRoleChange("owner")}
              >
                Merchant
              </div>
            </div>
            <h4 className={styles.categoryTitle}>
              Already have an account? Click <Link href="/login">here</Link>
            </h4>
            <button className={styles.signUpButton} onClick={submitAnswer}>
              Sign Up
            </button>
            {message && <p className={styles.message}>{message}</p>}
          </div>
        </div>
      </div>
    </main>
  );
}
