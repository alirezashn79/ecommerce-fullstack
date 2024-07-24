import { getUserId } from "@/utils/serverHelpers";
import DataTable from "components/templates/p-user/comments/data-table";
import connectToDB from "configs/db";
import commentModel from "models/Comment";
import { useRouter } from "next/navigation";

const page = async () => {
  await connectToDB();
  const user = await getUserId();
  const comments = await commentModel
    .find({ user }, "product date score isAccepted body")
    .populate("product", "name");
  return (
    <main>
      {comments.length > 0 && (
        <DataTable
          comments={JSON.parse(JSON.stringify(comments))}
          title="لیست کامنت‌ها"
        />
      )}
      {comments.length === 0 && (
        <p
          style={{ fontSize: "32px", textAlign: "center", marginTop: "18rem" }}
        >
          کامنتی وجود ندارد
        </p>
      )}
    </main>
  );
};

export default page;
