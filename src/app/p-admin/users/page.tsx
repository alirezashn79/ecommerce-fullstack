import Table from "components/templates/p-admin/users/table";
import banModel from "models/Ban";
import userModel from "models/User";
import { authUser } from "utils/serverHelpers";
export default async function UsersPage() {
  const user = (await authUser()) as {
    _id: string;
    role: "ADMIN" | "USER";
  };

  const users = await userModel.find(
    {
      $nor: [
        {
          _id: user._id,
        },
      ],
    },
    "name email phone role"
  );

  const bannedUsers = await banModel.find({}, "email phone");

  return (
    <main>
      {users.length === 0 ? (
        <p>کاربری وجود ندارد</p>
      ) : (
        <Table
          bannedUsers={JSON.parse(JSON.stringify(bannedUsers))}
          users={JSON.parse(JSON.stringify(users))}
          title="لیست کاربران"
        />
      )}
    </main>
  );
}
