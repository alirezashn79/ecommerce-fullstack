import AddDiscount from "components/templates/p-admin/discounts/addDiscount";
import Table from "components/templates/p-admin/discounts/Table";
import discountModel from "models/Discount";

export default async function DiscountsPage() {
  const discounts = await discountModel
    .find({}, "-updatedAt -__v")
    .sort({ _id: -1 });

  return (
    <main>
      <AddDiscount />
      {discounts.length === 0 ? (
        <p
          style={{
            color: "white",
            backgroundColor: "#711d1c",
            padding: "0.7rem 2rem",
            width: "max-content",
            margin: "2.5rem auto",
            fontSize: "1.7rem",
            borderRadius: "5px",
          }}
        >
          کد تخفیفی وجود ندارد
        </p>
      ) : (
        <section style={{ padding: "20px" }}>
          <Table
            title="لیست کدهای تخفیف"
            discounts={JSON.parse(JSON.stringify(discounts))}
          />
        </section>
      )}
    </main>
  );
}
