import Table from "components/templates/p-admin/products/Table";
import productModel from "models/Product";
import Link from "next/link";

export default async function ProductsPage() {
  const products = await productModel
    .find({}, "-updatedAt -__v")
    .sort({ _id: -1 });

  return (
    <main>
      {products.length === 0 ? (
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
          محصولی وجود ندارد
        </p>
      ) : (
        <section style={{ padding: "20px" }}>
          <h1 style={{ marginBottom: "50px" }}>
            <Link href="/p-admin/products/add">اضافه کردن محصول جدید</Link>
          </h1>
          <Table
            title="لیست محصولات"
            products={JSON.parse(JSON.stringify(products))}
          />
        </section>
      )}
    </main>
  );
}
