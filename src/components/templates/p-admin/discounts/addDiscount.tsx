"use client";

import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import client from "configs/client";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zDiscountSchema } from "schemas/discount";
import { TypeOf } from "zod";
import styles from "./add-discount.module.css";

type discountTypes = TypeOf<typeof zDiscountSchema>;

export default function AddDiscount() {
  const { refresh } = useRouter();
  const {
    register,
    formState: { errors, isSubmitting },
    reset,
    handleSubmit,
  } = useForm<discountTypes>({
    resolver: zodResolver(zDiscountSchema),
  });

  const handleAddDiscount: SubmitHandler<discountTypes> = async (values) => {
    try {
      const res = await client.post("/discount", values);
      toast.success(res.data.message);
      reset();
      refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={styles.discount}>
      <p>افزودن کد تخفیف جدید</p>
      <form onSubmit={handleSubmit(handleAddDiscount)}>
        <div className={styles.discount_main}>
          <div>
            <label>شناسه تخفیف</label>
            <input
              {...register("code")}
              placeholder="لطفا شناسه تخفیف را وارد کنید"
              type="text"
            />
            <ErrorMessage errors={errors} name="code" />
          </div>
          <div>
            <label>درصد تخفیف</label>
            <input
              {...register("percent", { valueAsNumber: true })}
              placeholder="لطفا درصد تخفیف را وارد کنید"
              type="number"
            />
            <ErrorMessage errors={errors} name="percent" />
          </div>
          <div>
            <label>حداکثر استفاده</label>
            <input
              {...register("maxUse", { valueAsNumber: true })}
              placeholder="حداکثر استفاده از کد تخفیف"
              type="number"
            />
            <ErrorMessage errors={errors} name="maxUse" />
          </div>
          {/* <div>
          <label>محصول</label>
          <select name="" id="">
            <option value="">قهوه ترک</option>
            <option value="">قهوه عربیکا</option>
            <option value="">قهوه اسپرسو</option>
          </select>
        </div> */}
        </div>
        <button disabled={isSubmitting} type="submit">
          افزودن
        </button>
      </form>
    </section>
  );
}
