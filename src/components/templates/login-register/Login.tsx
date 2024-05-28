"use client";
import Link from "next/link";
import React, { useState } from "react";
import styles from "./login.module.css";
import Sms from "./Sms";

interface ILogin {
  showRegisterForm: () => void;
}

const Login: React.FC<ILogin> = ({ showRegisterForm }) => {
  const [isShowOtp, setIsShowOtp] = useState(false);

  const goBack = () => setIsShowOtp(false);

  if (isShowOtp) return <Sms goBack={goBack} />;

  return (
    <>
      <div className={styles.form}>
        <input
          className={styles.input}
          type="text"
          placeholder="ایمیل/شماره موبایل"
        />
        <input
          className={styles.input}
          type="password"
          placeholder="رمز عبور"
        />
        <div className={styles.checkbox}>
          <input type="checkbox" name="" id="" />
          <p>مرا به یاد داشته باش</p>
        </div>
        <button className={styles.btn}>ورود</button>
        <Link href={"/forgot-password"} className={styles.forgot_pass}>
          رمز عبور را فراموش کرده اید؟
        </Link>
        <button onClick={() => setIsShowOtp(true)} className={styles.btn}>
          ورود با کد یکبار مصرف
        </button>
        <span>ایا حساب کاربری ندارید؟</span>
        <button onClick={showRegisterForm} className={styles.btn_light}>
          ثبت نام
        </button>
      </div>
      <Link href={"/"} className={styles.redirect_to_home}>
        لغو
      </Link>
    </>
  );
};

export default Login;
