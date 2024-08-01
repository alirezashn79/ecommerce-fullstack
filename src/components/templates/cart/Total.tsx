"use client";

import Link from "next/link";
import { useState } from "react";
import Select from "react-select";
import stateData from "utils/stateData";
import totalStyles from "./totals.module.css";
interface TotalProps {
  totalPrice: () => number;
}
export default function Total({ totalPrice }: TotalProps) {
  const [stateSelectedOption, setStateSelectedOption] = useState<null | {
    label: string;
    value: string[];
  }>(null);
  const [changeAddress, setChangeAddress] = useState(false);

  const stateOptions = stateData();

  return (
    <div className={totalStyles.totals}>
      <p className={totalStyles.totals_title}>جمع کل سبد خرید</p>

      <div className={totalStyles.subtotal}>
        <p>جمع جزء </p>
        <p>{totalPrice().toLocaleString()} تومان</p>
      </div>

      <p className={totalStyles.motor}>
        {" "}
        پیک موتوری: <strong> 30,000 </strong>
      </p>
      <div className={totalStyles.address}>
        <p>حمل و نقل </p>
        <span>حمل و نقل به تهران (فقط شهر تهران).</span>
      </div>
      <p
        onClick={() => setChangeAddress((prev) => !prev)}
        className={totalStyles.change_address}
      >
        تغییر آدرس
      </p>
      {changeAddress && (
        <div className={totalStyles.address_details}>
          <Select
            defaultValue={stateSelectedOption}
            onChange={setStateSelectedOption}
            isClearable={true}
            placeholder={"استان"}
            isRtl={true}
            isSearchable={true}
            options={stateOptions}
          />

          <input type="text" placeholder="شهر" />
          <input type="number" placeholder="کد پستی" />
          <button onClick={() => setChangeAddress(false)}>بروزرسانی</button>
        </div>
      )}

      <div className={totalStyles.total}>
        <p>مجموع</p>
        <p>{(totalPrice() + 30000).toLocaleString()} تومان</p>
      </div>
      <Link href={"/checkout"}>
        <button className={totalStyles.checkout_btn}>
          ادامه جهت تصویه حساب
        </button>
      </Link>
    </div>
  );
}
