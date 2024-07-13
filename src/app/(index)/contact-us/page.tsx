import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";
import Form from "@/components/templates/contact-us/form";
import Information from "@/components/templates/contact-us/info";
import styles from "@/styles/contact-us.module.css";

const page = async () => {
  return (
    <>
      <Breadcrumb route={"تماس با ما"} />
      <div className={styles.container}>
        <div className={styles.contents}>
          <Form />
          <Information />
        </div>
      </div>
    </>
  );
};

export default page;
