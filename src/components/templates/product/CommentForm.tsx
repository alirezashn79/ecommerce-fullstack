"use client";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import client from "configs/client";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import { zCommentSchema } from "schemas/comment";
import { TypeOf } from "zod";
import styles from "./commentForm.module.css";

const commentSchema = zCommentSchema.omit({
  date: true,
  product: true,
  score: true,
});
type TCommentForm = TypeOf<typeof zCommentSchema>;

const CommentForm = ({ productID }: { productID: string }) => {
  const [isUserRemember, setIsUserRemember] = useState(false);
  const [score, setScore] = useState(0);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TCommentForm>({
    resolver: zodResolver(commentSchema),
  });

  const createFormHandler: SubmitHandler<TCommentForm> = async (values) => {
    const inputsData = {
      ...values,
      score,
      product: productID,
    };

    const res = await client.post("/comments", inputsData);

    if (res.status === 201) {
      if (isUserRemember) {
        const userInfo = {
          username: values.username,
          email: values.email,
        };
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
      }
      toast.success(res.data.message);
      reset();
      setScore(0);
    }
  };

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (!userInfo) return;
    const parsedInfo = JSON.parse(userInfo) as {
      username: string;
      email: string;
    };
    setValue("username", parsedInfo.username);
    setValue("email", parsedInfo.email);
    setIsUserRemember(true);
  }, []);
  return (
    <div className={styles.form}>
      <p className={styles.title}>دیدگاه خود را بنویسید</p>
      <p>
        نشانی ایمیل شما منتشر نخواهد شد. بخش‌های موردنیاز علامت‌گذاری شده‌اند{" "}
        <span style={{ color: "red" }}>*</span>
      </p>

      <div className={styles.rate}>
        <p>امتیاز شما :</p>
        <div>
          {Array.from({ length: 5 }).map((_, idx) => (
            <FaStar
              key={idx}
              style={{
                color: score >= idx + 1 ? "orange" : "",
              }}
              onClick={setScore.bind(null, idx + 1)}
            />
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit(createFormHandler)}>
        <div className={styles.group}>
          <label htmlFor="">
            دیدگاه شما
            <span style={{ color: "red" }}>*</span>
          </label>
          <textarea {...register("body")} cols={45} rows={8}></textarea>
          <div style={{ color: "red", fontSize: "12px" }}>
            <ErrorMessage errors={errors} name="body" />
          </div>
        </div>
        <div className={styles.groups}>
          <div className={styles.group}>
            <label htmlFor="">
              نام
              <span style={{ color: "red" }}>*</span>
            </label>
            <input {...register("username")} type="text" />
            <div style={{ color: "red", fontSize: "12px" }}>
              <ErrorMessage errors={errors} name="username" />
            </div>
          </div>
          <div className={styles.group}>
            <label htmlFor="">
              ایمیل
              <span style={{ color: "red" }}>*</span>
            </label>
            <input {...register("email")} type="email" />
            <div style={{ color: "red", fontSize: "12px" }}>
              <ErrorMessage errors={errors} name="email" />
            </div>
          </div>
        </div>
        <button type="submit">ثبت</button>
      </form>
      <div className={styles.checkbox}>
        <input
          type="checkbox"
          onChange={(e) => setIsUserRemember(e.target.checked)}
          checked={isUserRemember}
        />
        <p>
          {" "}
          ذخیره نام، ایمیل و وبسایت من در مرورگر برای زمانی که دوباره دیدگاهی
          می‌نویسم.
        </p>
      </div>
    </div>
  );
};

export default CommentForm;
