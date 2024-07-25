"use client";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import client from "configs/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";
import { userInfoSchema } from "schemas/auth";
import styles from "styles/p-user/accountDetails.module.css";
import { InferType } from "yup";

function AccountDetails() {
  const { replace, refresh } = useRouter();
  const {
    register,
    getValues,
    formState: { errors },
  } = useForm<InferType<typeof userInfoSchema>>({
    mode: "all",
    defaultValues: async () => {
      const user = await client.get("/auth/me");

      return {
        email: user.data.email,
        name: user.data.name,
        phone: user.data.phone,
      };
    },
    resolver: yupResolver(userInfoSchema),
  });

  const updateUser = async () => {
    if (Object.keys(errors).length > 0) return;

    const res = await client.post("/auth/edit-account", getValues());

    if (res.status && res.status === 200) {
      swal({
        title: "اطلاعات با موفقیت تغییر کرد",
        icon: "success",
        buttons: "باش",
      }).then(async (result) => {
        if (result) {
          await client.get("/auth/signout");
          replace("/login-register");
          refresh();
        }
      });
    }
  };

  return (
    <main>
      <div className={styles.details}>
        <h1 className={styles.title}>
          <span> جزئیات اکانت</span>
        </h1>
        <div className={styles.details_main}>
          <section>
            <div>
              <label>نام کاربری</label>
              <input
                {...register("name")}
                autoComplete="off"
                placeholder="لطفا نام کاربری خود را وارد کنید"
                type="text"
              />
              <ErrorMessage
                errors={errors}
                name="name"
                render={({ message }) => (
                  <p style={{ fontSize: "12px", color: "red" }}>{message}</p>
                )}
              />
            </div>
            <div>
              <label>ایمیل</label>
              <input
                {...register("email")}
                autoComplete="off"
                placeholder="لطفا ایمیل خود را وارد کنید"
                type="text"
              />
              <ErrorMessage
                errors={errors}
                name="email"
                render={({ message }) => (
                  <p style={{ fontSize: "12px", color: "red" }}>{message}</p>
                )}
              />
            </div>
            <div>
              <label>شماره تماس</label>
              <input
                {...register("phone")}
                autoComplete="off"
                placeholder="لطفا شماره تماس خود را وارد کنید"
                type="text"
              />
              <ErrorMessage
                errors={errors}
                name="phone"
                render={({ message }) => (
                  <p style={{ fontSize: "12px", color: "red" }}>{message}</p>
                )}
              />
            </div>
          </section>
          <section>
            <div className={styles.uploader}>
              <img src="/images/shahin.jpg" alt="" />
              <div>
                <div>
                  <button>
                    <IoCloudUploadOutline />
                    تغییر
                  </button>
                  <input autoComplete="off" type="file" name="" id="" />
                </div>
                <button>
                  <MdOutlineDelete />
                  حذف
                </button>
              </div>
            </div>
            <div>
              <label>رمز عبور</label>
              <div className={styles.password_group}>
                <input autoComplete="off" type="password" />
                <button>تغییر رمز عبور</button>
              </div>
            </div>
          </section>
        </div>
        <button
          type="submit"
          onClick={updateUser}
          className={styles.submit_btn}
        >
          ثبت تغییرات
        </button>
      </div>
    </main>
  );
}

export default AccountDetails;
