"use client";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { signinDynamicIndntifier } from "schemas/auth";
import { InferType } from "yup";
import styles from "./login.module.css";
import Sms from "./Sms";
import { valiadteEmail } from "@/utils/auth";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface ILogin {
  showRegisterForm: () => void;
}

const Login: React.FC<ILogin> = ({ showRegisterForm }) => {
  const [isShowOtp, setIsShowOtp] = useState(false);
  const goBack = () => setIsShowOtp(false);

  // hooks
  const router = useRouter();
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<InferType<typeof signinDynamicIndntifier>>({
    mode: "all",
    resolver: yupResolver(signinDynamicIndntifier),
  });

  const signinWithEmail: SubmitHandler<
    InferType<typeof signinDynamicIndntifier>
  > = async (values) => {
    if (!valiadteEmail(values.identifier)) {
      setError("identifier", {
        message: "email is invalid",
      });
      return;
    }

    try {
      const res = await axios.post("/api/auth/signin", {
        email: values.identifier,
        password: values.password,
      });
      toast.success(res.data.message);
      window.location.replace("/");
    } catch (error) {
      if (error.response) {
        toast.error(
          `${error.response.data.message}  (${error.response.status})`
        );
      }
    }
  };

  if (isShowOtp) return <Sms goBack={goBack} />;

  return (
    <>
      <div className={styles.form}>
        <input
          {...register("identifier")}
          className={styles.input}
          style={{
            border: errors.identifier && "1px solid red",
            outline: "none",
          }}
          type="text"
          placeholder="ایمیل/شماره موبایل"
        />
        <ErrorMessage
          errors={errors}
          name="identifier"
          render={({ message }) => (
            <span style={{ color: "red", fontSize: "10px" }}>{message}</span>
          )}
        />
        <input
          {...register("password")}
          className={styles.input}
          style={{
            border: errors.password && "1px solid red",
            outline: "none",
          }}
          type="password"
          placeholder="رمز عبور"
        />
        <ErrorMessage
          errors={errors}
          name="password"
          render={({ message }) => (
            <span style={{ color: "red", fontSize: "10px" }}>{message}</span>
          )}
        />
        <div className={styles.checkbox}>
          <input type="checkbox" name="" id="" />
          <p>مرا به یاد داشته باش</p>
        </div>
        <button className={styles.btn} onClick={handleSubmit(signinWithEmail)}>
          ورود
        </button>
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
