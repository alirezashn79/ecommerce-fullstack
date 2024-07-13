import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";
import Form from "@/components/templates/contact-us/form";
import Information from "@/components/templates/contact-us/info";
import Map from "@/components/templates/contact-us/map";
import styles from "@/styles/contact-us.module.css";
import Link from "next/link";

// [35.72021225108499, 51.42222691580869]
// [35.70153474690238, 51.41497422314844]

const page = async () => {
  return (
    <>
      <Breadcrumb route={"تماس با ما"} />

      <div className={styles.container}>
        <div className={styles.maps}>
          <section>
            <Map
              position={[35.72021225108499, 51.42222691580869]}
              center={[35.72021225108499, 51.42222691580869]}
            >
              <span> فروشگاه ما</span>
              <h3>آدرس فروشگاه حضوری قهوه ست (شعبه جم)</h3>
              <p>
                تهران – خ کریمخان زند – خ قائم مقام فراهانی – ابتدای خ فجر(جم) –
                شماره ۱۰
              </p>
              <p>021-88305827</p>
              <Link href="/about-us">درباره فروشگاه</Link>
            </Map>
          </section>
          <section>
            <Map
              position={[35.70153474690238, 51.41497422314844]}
              center={[35.70153474690238, 51.41497422314844]}
            >
              <span> فروشگاه ما</span>
              <h3>آدرس فروشگاه حضوری قهوه ست (شعبه جم)</h3>
              <p>
                تهران – خ کریمخان زند – خ قائم مقام فراهانی – ابتدای خ فجر(جم) –
                شماره ۱۰
              </p>
              <p>021-88305827</p>
              <Link href="/about-us">درباره فروشگاه</Link>
            </Map>
          </section>
        </div>
        <div className={styles.contents}>
          <Form />
          <Information />
        </div>
      </div>
    </>
  );
};

export default page;
