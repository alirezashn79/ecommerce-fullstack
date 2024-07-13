import styles from "./form.module.css";

const Form = () => {
  return (
    <form className={styles.form}>
      <span>فرم تماس با ما</span>
      <p>برای تماس با ما می توانید فرم زیر را تکمیل کنید</p>
      <div className={styles.groups}>
        <div className={styles.group}>
          <label>نام و نام خانوادگی</label>
          <input type="text" />
        </div>
        <div className={styles.group}>
          <label>آدرس ایمیل</label>
          <input type="text" />
        </div>
      </div>
      <div className={styles.groups}>
        <div className={styles.group}>
          <label>شماره تماس</label>
          <input type="text" />
        </div>
        <div className={styles.group}>
          <label>نام شرکت</label>
          <input type="text" />
        </div>
      </div>
      <div className={styles.group}>
        <label>درخواست شما</label>
        <textarea name="" id="" cols={30} rows={3}></textarea>
      </div>
      <button>ارسال</button>
    </form>
  );
};

export default Form;
