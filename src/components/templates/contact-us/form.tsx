"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { contactSchema } from "schemas/contact";
import { TContact } from "types/types";
import styles from "./form.module.css";
import { ErrorMessage } from "@hookform/error-message";
import client from "configs/client";
import { toast } from "react-toastify";
import axios from "axios";

const Form = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<TContact>({
    mode: "all",

    resolver: zodResolver(contactSchema),
  });

  const onSubmit: SubmitHandler<TContact> = async (values) => {
    const loadingToast = toast.loading("صبر کنید", {
      rtl: true,
    });
    try {
      await axios.post("/api/contact", values);
      toast.success("پیغام شما ثبت شد", {
        rtl: true,
      });
      reset();
    } catch (error) {
      if (error.response) {
        toast.error(
          `Error-${error.resoponse.status} : ${error.response.data.message}`
        );
      }
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <span>فرم تماس با ما</span>
      <p>برای تماس با ما می توانید فرم زیر را تکمیل کنید</p>
      <div className={styles.groups}>
        <div className={styles.group}>
          <label>نام و نام خانوادگی</label>
          <input {...register("name")} type="text" />
          <ErrorMessage
            errors={errors}
            name="name"
            render={(err) => (
              <p style={{ color: "red", fontSize: "12px" }}>{err.message}</p>
            )}
          />
        </div>
        <div className={styles.group}>
          <label>آدرس ایمیل</label>
          <input {...register("email")} type="text" />
          <ErrorMessage
            errors={errors}
            name="email"
            render={(err) => (
              <p style={{ color: "red", fontSize: "12px" }}>{err.message}</p>
            )}
          />
        </div>
      </div>
      <div className={styles.groups}>
        <div className={styles.group}>
          <label>شماره تماس</label>
          <input {...register("phone")} type="text" />
          <ErrorMessage
            errors={errors}
            name="phone"
            render={(err) => (
              <p style={{ color: "red", fontSize: "12px" }}>{err.message}</p>
            )}
          />
        </div>
        <div className={styles.group}>
          <label>نام شرکت</label>
          <input {...register("company")} type="text" />
          <ErrorMessage
            errors={errors}
            name="company"
            render={(err) => (
              <p style={{ color: "red", fontSize: "12px" }}>{err.message}</p>
            )}
          />
        </div>
      </div>
      <div className={styles.group}>
        <label>درخواست شما</label>
        <textarea {...register("message")} cols={30} rows={3}></textarea>
        <ErrorMessage
          errors={errors}
          name="message"
          render={(err) => (
            <p style={{ color: "red", fontSize: "12px" }}>{err.message}</p>
          )}
        />
      </div>
      <button type="submit">ارسال</button>
    </form>
  );
};

export default Form;
