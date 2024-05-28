"use client";

import styles from "@/styles/login-register.module.css";
// import { authTypes } from "@/utils/constants";
import { authTypes } from "@/utils/constants.json";
import { useState } from "react";

import Login from "@/components/templates/login-register/Login";
import Register from "@/components/templates/login-register/Register";

const login_register = () => {
  // states
  const [formType, setFormType] = useState(authTypes.LOGIN);

  const showRegisterForm = () => setFormType(authTypes.REGISTER);
  const showloginForm = () => setFormType(authTypes.LOGIN);

  return (
    <div className={styles.login_register}>
      <div className={styles.form_bg} data-aos="fade-up">
        {formType === authTypes.LOGIN ? (
          <Login showRegisterForm={showRegisterForm} />
        ) : (
          <Register showloginForm={showloginForm} />
        )}
      </div>
      <section>
        <img
          src="https://neurosciencenews.com/files/2023/06/coffee-brain-caffeine-neuroscincces.jpg"
          alt=""
        />
      </section>
    </div>
  );
};

export default login_register;
