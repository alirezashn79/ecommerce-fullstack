import EditProduct from "components/templates/p-admin/products/editProduct";
import productModel from "models/Product";

export default async function page({ params }: { params: { id: string } }) {
  const product = await productModel.findById(params.id);

  return <EditProduct product={JSON.parse(JSON.stringify(product))} />;
}
