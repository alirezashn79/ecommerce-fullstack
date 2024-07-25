"use client";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import client from "configs/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoIosSend } from "react-icons/io";
import { toast } from "react-toastify";
import { zTicketSchema } from "schemas/ticket";
import styles from "styles/p-user/sendTicket.module.css";
import { TypeOf } from "zod";

type TSendTicketForm = Omit<
  TypeOf<typeof zTicketSchema>,
  "department" | "subDepartment" | "priority" | "hasAnswered" | "answer"
> & {
  department: string;
  subDepartment: string;
  priority: "-1" | "1" | "2" | "3";
};

const page = () => {
  const [departments, setDepartments] = useState<
    null | { _id: string; title: string }[]
  >();
  const [subDepartments, setSubDepartments] = useState<
    null | { _id: string; title: string }[]
  >();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<TSendTicketForm>({
    defaultValues: {
      title: "",
      body: "",
      priority: "-1",
      department: "-1",
      subDepartment: "-1",
    },

    resolver: zodResolver(zTicketSchema),
  });

  const onSubmit: SubmitHandler<TSendTicketForm> = async (values) => {
    try {
      await client.post("/tickets", values);
      reset();
      toast.success("تیکت با موفقیت ثبت شد");
      router.push("/p-user/tickets");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getSubDepartments = async () => {
      if (watch("department") !== "-1") {
        const res = await client.get(
          `/departments/subs/${watch("department")}`
        );
        setSubDepartments(res.data);
      } else {
        setSubDepartments(null);
      }
    };
    getSubDepartments();
  }, [watch("department")]);
  useEffect(() => {
    const getDepartments = async () => {
      const res = await client.get("/departments");
      setDepartments(res.data);
    };

    getDepartments();
  }, []);
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>
        <span>ارسال تیکت جدید</span>
        <Link href="/p-user/tickets"> همه تیکت ها</Link>
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.content}>
          <div className={styles.group}>
            <label>دپارتمان را انتخاب کنید:</label>
            <select {...register("department")}>
              <option value="-1">لطفا یک مورد را انتخاب نمایید.</option>
              {departments?.map((item) => (
                <option key={item._id.toString()} value={item._id.toString()}>
                  {item.title}
                </option>
              ))}
            </select>
            <ErrorMessage errors={errors} name="department" />
          </div>
          <div className={styles.group}>
            <label>نوع تیکت را انتخاب کنید:</label>
            <select {...register("subDepartment")}>
              <option value="-1">لطفا یک مورد را انتخاب نمایید.</option>

              {subDepartments?.map((item) => (
                <option key={item._id.toString()} value={item._id.toString()}>
                  {item.title}
                </option>
              ))}
            </select>
            <ErrorMessage errors={errors} name="subDepartment" />
          </div>
          <div className={styles.group}>
            <label>عنوان تیکت را وارد کنید:</label>
            <input {...register("title")} placeholder="عنوان..." type="text" />
            <ErrorMessage errors={errors} name="title" />
          </div>
          <div className={styles.group}>
            <label>سطح اولویت تیکت را انتخاب کنید:</label>
            <select {...register("priority")}>
              <option value="-1">لطفا یک مورد را انتخاب نمایید.</option>
              <option value="1">کم</option>
              <option value="2">متوسط</option>
              <option value="3">بالا</option>
            </select>
            <ErrorMessage errors={errors} name="priority" />
          </div>
        </div>
        <div className={styles.group}>
          <label>محتوای تیکت را وارد نمایید:</label>
          <textarea {...register("body")} rows={10}></textarea>
          <ErrorMessage errors={errors} name="body" />
        </div>
        <div className={styles.uploader}>
          <span>حداکثر اندازه: 6 مگابایت</span>
          <span>فرمت‌های مجاز: jpg, png.jpeg, rar, zip</span>
          <input type="file" />
        </div>

        <button disabled={isSubmitting} type="submit" className={styles.btn}>
          <IoIosSend />
          ارسال تیکت
        </button>
      </form>
    </main>
  );
};

export default page;
