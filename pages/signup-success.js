import React from "react";
import styles from "../styles/Signedup.module.css";
function SignupSuccess() {
  return (
    <div className={styles.successMessage}>
      <h3>
        You've signed up sucessfully. Check your email to confirm your account
      </h3>
    </div>
  );
}

export default SignupSuccess;
