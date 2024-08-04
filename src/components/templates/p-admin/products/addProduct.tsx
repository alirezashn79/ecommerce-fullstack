"use client";

import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { TypeOf, z } from "zod";
import styles from "./add-product.module.css";
import client from "configs/client";
import { toast } from "react-toastify";

const zProductSchema = z.object({
  name: z.string().trim().min(6),
  price: z.number().positive(),
  shortDescription: z.string().trim().min(10),
  longDescription: z.string().trim().min(15),
  weight: z.number().positive(),
  suitableFor: z.string().trim().min(4),
  smell: z.string().trim().min(4),
  tags: z.string().trim().min(4),
  inventory: z.number().positive(),
});

type TProduct = TypeOf<typeof zProductSchema>;

export default function AddProduct() {
  const { refresh } = useRouter();
  const {
    register,
    formState: { errors, isSubmitting },
    reset,
    handleSubmit,
  } = useForm<TProduct>({
    resolver: zodResolver(zProductSchema),
  });

  const handleAddProduct: SubmitHandler<TProduct> = async (values) => {
    const tags = values.tags.split(" ");
    try {
      const res = await client.post("/products", {
        ...values,
        tags,
      });
      toast.success(res.data.message);
      reset();
      refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={styles.discount}>
      <p>افزودن محصول تخفیف جدید</p>
      <form onSubmit={handleSubmit(handleAddProduct)}>
        <div className={styles.discount_main}>
          <div>
            <label>نام محصول</label>
            <input {...register("name")} type="text" />
            <ErrorMessage errors={errors} name="name" />
          </div>
          <div>
            <label>قیمت محصول</label>
            <input
              {...register("price", { valueAsNumber: true })}
              type="number"
            />
            <ErrorMessage errors={errors} name="price" />
          </div>

          <div>
            <label>توضیحات کوتاه</label>
            <input {...register("shortDescription")} type="text" />
            <ErrorMessage errors={errors} name="shortDescription" />
          </div>

          <div>
            <label>وزن</label>
            <input
              {...register("weight", { valueAsNumber: true })}
              type="number"
            />
            <ErrorMessage errors={errors} name="weight" />
          </div>

          <div>
            <label>مفید برای</label>
            <input {...register("suitableFor")} type="text" />
            <ErrorMessage errors={errors} name="suitableFor" />
          </div>

          <div>
            <label>میزان بو</label>
            <input {...register("smell")} type="text" />
            <ErrorMessage errors={errors} name="smell" />
          </div>

          <div>
            <label>تگ</label>
            <input {...register("tags")} type="text" />
            <ErrorMessage errors={errors} name="tags" />
          </div>

          <div>
            <label>موجودی انبار</label>
            <input
              {...register("inventory", { valueAsNumber: true })}
              type="number"
            />
            <ErrorMessage errors={errors} name="inventory" />
          </div>

          <div>
            <label>توضیحات کامل</label>
            <textarea {...register("longDescription")} rows={4} />
            <ErrorMessage errors={errors} name="longDescription" />
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
