import { authUser } from "@/utils/serverHelpers";
import Sidebar from "components/modules/sidebar/sidebar";
import Topbar from "@/components/modules/topbar/topbar";
import { redirect } from "next/navigation";
import React from "react";
import styles from "styles/p-admin/adminPanelLayout.module.css";

export default async function AdminPanelLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const user = await authUser();

  let typedUser;
  if (typeof user === "object") {
    typedUser = JSON.parse(JSON.stringify(user)) as {
      _id: string;
      name: string;
      role: "USER" | "ADMIN";
    };
  }

  if (!typedUser || typedUser.role !== "ADMIN") {
    return redirect("/");
  }
  return (
    <div className={styles.layout}>
      <section className={styles.section}>
        <Sidebar user={typedUser} />
        <div className={styles.contents}>
          <Topbar user={typedUser} />
          {children}
        </div>
      </section>
    </div>
  );
}
