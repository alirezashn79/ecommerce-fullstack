import { useState } from "react";
import styles from "./register.module.css";
import Sms from "./Sms";

interface IRegister {
  showloginForm: () => void;
}

const Register: React.FC<IRegister> = ({ showloginForm }) => {
  // states
  const [isShowOtp, setIsShowOtp] = useState(false);
  const [isRegisterWithPass, setIsRegisterWithPass] = useState(false);

  const goBack = () => setIsShowOtp(false);

  if (isShowOtp) return <Sms goBack={goBack} />;

  return (
    <>
      <div className={styles.form}>
        <input className={styles.input} type="text" placeholder="نام" />
        <input
          className={styles.input}
          type="text"
          placeholder="شماره موبایل  "
        />
        <input
          className={styles.input}
          type="email"
          placeholder="ایمیل (دلخواه)"
        />

        {isRegisterWithPass && (
          <input
            className={styles.input}
            type="password"
            placeholder="رمز عبور"
          />
        )}

        <p
          onClick={() => setIsShowOtp(true)}
          style={{ marginTop: "1rem" }}
          className={styles.btn}
        >
          ثبت نام با کد تایید
        </p>
        <button
          onClick={() => setIsRegisterWithPass(true)}
          style={{ marginTop: ".7rem" }}
          className={styles.btn}
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
