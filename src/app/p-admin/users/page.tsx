import Table from "components/templates/p-admin/users/table";
import banModel from "models/Ban";
import userModel from "models/User";
import { getUserId } from "utils/serverHelpers";
export default async function UsersPage() {
  const userId = await getUserId();

  const users = await userModel.find(
    {
      $nor: [
        {
          _id: userId,
        },
      ],
    },
    "name email phone role"
  );

  const bannedUsers = await banModel.find({}, "email phone");

  return (
    <main>
      {/* <p className={styles.empty}>کاربری وجود ندارد</p> */}

      <Table
        bannedUsers={JSON.parse(JSON.stringify(bannedUsers))}
        users={JSON.parse(JSON.stringify(users))}
        title="لیست کاربران"
      />
    </main>
  );
}
