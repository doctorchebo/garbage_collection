import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import { LogoutUser } from "../app/auth/authActions";
import styles from "../styles/Logout.module.css";

function Logout() {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogout = () => {
    dispatch(LogoutUser());
    router.push("/");
  };
  return (
    <div className={styles.loginForm}>
      <button onClick={() => handleLogout()}>Logout</button>
    </div>
  );
}

export default Logout;
