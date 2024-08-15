import { authUser } from "@/utils/serverHelpers";
import DataTable from "components/templates/p-user/comments/data-table";
import connectToDB from "configs/db";
import commentModel from "models/Comment";

const page = async () => {
  await connectToDB();
  const user = (await authUser()) as {
    _id: string;
    role: "ADMIN" | "USER";
  };
  const comments = await commentModel
    .find({ user: user._id }, "product date score isAccepted body")
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
