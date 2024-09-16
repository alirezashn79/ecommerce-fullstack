"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import client from "configs/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zSignUpUserSchema } from "schemas/auth/signup";
import { zPhoneSchema } from "schemas/otp";
import { TypeOf } from "zod";
import styles from "./register.module.css";
import Sms from "./Sms";

interface IRegister {
  showloginForm: () => void;
}

type TSignup = TypeOf<typeof zSignUpUserSchema>;

const Register: React.FC<IRegister> = ({ showloginForm }) => {
  // states
  const [isShowOtp, setIsShowOtp] = useState(false);
  const [isRegisterWithPass, setIsRegisterWithPass] = useState(false);
  const [sendOtpLoading, setSendOtpLoading] = useState(false);

  // hooks
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<TSignup>({
    mode: "all",

    resolver: zodResolver(zSignUpUserSchema),
  });

  // handlers
  const handleSignupWithPass: SubmitHandler<TSignup> = async (values) => {
    try {
      const res = await axios.post("/api/auth/signup", {
        ...values,
        name: values.name || undefined,
      });
      toast.success(res.data.message);
      reset();
      router.replace("/p-user");
      router.refresh();
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  const handleSignUpWithCode = async () => {
    const validationResult = zPhoneSchema.safeParse({
      phone: getValues("phone"),
    });

    if (!validationResult.success) {
      return toast.error("تلفن  همراه صحیح نیست");
    }

    try {
      setSendOtpLoading(true);
      const res = await client.post("/auth/sms/signup/send", {
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

  const togglePassInput = () => setIsRegisterWithPass(true);

  const goBack = () => setIsShowOtp(false);

  if (isShowOtp)
    return <Sms type="signup" goBack={goBack} phone={getValues("phone")} />;

  return (
    <>
      <div className={styles.form}>
        <input
          {...register("name")}
          className={styles.input}
          type="text"
          placeholder="نام (اختیاری)"
        />
        {errors.name && (
          <span
            style={{ marginTop: "0.5rem", marginBottom: "0", color: "red" }}
          >
            {errors.name.message}
          </span>
        )}
        <input
          {...register("phone")}
          className={styles.input}
          type="text"
          placeholder="شماره موبایل  "
        />
        {errors.phone && (
          <span
            style={{ marginTop: "0.5rem", marginBottom: "0", color: "red" }}
          >
            {errors.phone.message}
          </span>
        )}
        <input
          {...register("email")}
          className={styles.input}
          type="email"
          placeholder="ایمیل (اختیاری)"
        />
        {errors.email && (
          <span
            style={{ marginTop: "0.5rem", marginBottom: "0", color: "red" }}
          >
            {errors.email.message}
          </span>
        )}
        {isRegisterWithPass && (
          <input
            {...register("password")}
            className={styles.input}
            type="password"
            placeholder="رمز عبور"
          />
        )}
        {errors.password && (
          <span
            style={{ marginTop: "0.5rem", marginBottom: "0", color: "red" }}
          >
            {errors.password.message}
          </span>
        )}

        {!isRegisterWithPass && (
          <button
            type="button"
            disabled={sendOtpLoading}
            onClick={handleSignUpWithCode}
            style={{ marginTop: "1rem" }}
            className={styles.btn}
          >
            ثبت نام با کد تایید
          </button>
        )}
        <button
          onClick={
            isRegisterWithPass
              ? handleSubmit(handleSignupWithPass)
              : togglePassInput
          }
          style={{ marginTop: ".7rem" }}
          className={styles.btn}
          disabled={isSubmitting}
        >
          ثبت نام با رمزعبور
        </button>
        <p onClick={showloginForm} className={styles.back_to_login}>
          برگشت به ورود
        </p>
      </div>
      <p className={styles.redirect_to_home}>لغو</p>
    </>
  );
};

export default Register;
