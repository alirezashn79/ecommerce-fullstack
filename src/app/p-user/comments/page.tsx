import DataTable from "components/templates/p-user/comments/data-table";

const page = async () => {
  return (
    <main>
      <DataTable title="لیست کامنت‌ها" />
      {/* <p className={styles.empty}>
          کامنتی وجود ندارد
        </p>  */}
    </main>
  );
};

export default page;
