"use client";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import client from "configs/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zSigninSchema } from "schemas/auth/signin";
import { zPhoneSchema } from "schemas/otp";
import { TypeOf } from "zod";
import styles from "./login.module.css";
import Sms from "./Sms";

interface ILogin {
  showRegisterForm: () => void;
}
type TSignin = TypeOf<typeof zSigninSchema>;
const Login: React.FC<ILogin> = ({ showRegisterForm }) => {
  const [isShowOtp, setIsShowOtp] = useState(false);
  const [sendOtpLoading, setSendOtpLoading] = useState(false);
  const goBack = () => setIsShowOtp(false);

  // hooks
  const router = useRouter();
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<TSignin>({
    mode: "all",
    resolver: zodResolver(zSigninSchema),
  });

  const signinWithPassword: SubmitHandler<TSignin> = async (values) => {
    try {
      const res = await client.post("/auth/signin", {
        identifier: values.identifier,
        password: values.password,
      });
      toast.success(res.data.message);
      router.replace("/p-user");
      router.refresh();
    } catch (error) {
      if (error.response) {
        console.log(error);
      }
    }
  };

  const handleSiginWithCode = async () => {
    const validationResult = zPhoneSchema.safeParse({
      phone: getValues("identifier"),
    });

    if (!validationResult.success) {
      return toast.error("تلفن  همراه صحیح نیست");
    }

    try {
      setSendOtpLoading(true);
      const res = await client.post("/auth/sms/signin/send", {
        phone: validationResult.data.phone,
      });
      toast.success(res.data.message);
      setIsShowOtp(true);
    } catch (error) {
      console.log(error);
    } finally {
      setSendOtpLoading(false);
    }
  };

  if (isShowOtp)
    return (
      <Sms type="signin" phone={getValues("identifier")} goBack={goBack} />
    );

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
        <button
          className={styles.btn}
          onClick={handleSubmit(signinWithPassword)}
        >
          ورود
        </button>
        <Link href={"/forgot-password"} className={styles.forgot_pass}>
          رمز عبور را فراموش کرده اید؟
        </Link>
        <button
          disabled={sendOtpLoading}
          onClick={handleSiginWithCode}
          className={styles.btn}
        >
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
