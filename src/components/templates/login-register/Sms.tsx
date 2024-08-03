import { useState } from "react";
import styles from "./sms.module.css";
import { zCodeSchema } from "schemas/otp";
import { toast } from "react-toastify";
import client from "configs/client";
import { useRouter } from "next/navigation";
interface ISms {
  goBack: () => void;
  phone: string;
}
const Sms: React.FC<ISms> = ({ goBack, phone }) => {
  const { replace } = useRouter();
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");

  const handleVerifyOtpCode = async () => {
    const validationResult = zCodeSchema.safeParse({ code });
    if (!validationResult.success)
      return toast.error(validationResult.error.message);

    try {
      setLoading(true);
      const res = await client.post("/auth/sms/verify", { code, phone });
      toast.success(res.data.message);
      replace("/p-user");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className={styles.form}>
        <p>کد تایید</p>
        <span className={styles.code_title}>
          لطفاً کد تأیید ارسال شده را تایپ کنید
        </span>
        <span className={styles.number}>{phone}</span>
        <input
          disabled={loading}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className={styles.input}
          type="text"
        />
        <button
          disabled={loading}
          onClick={handleVerifyOtpCode}
          style={{ marginTop: "1rem" }}
          className={styles.btn}
        >
          ثبت کد تایید
        </button>
        <p className={styles.send_again_code}>ارسال مجدد کد یکبار مصرف</p>
      </div>
      <p onClick={goBack} className={styles.redirect_to_home}>
        لغو
      </p>
    </>
  );
};

export default Sms;
