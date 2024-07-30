import { authUser } from "@/utils/serverHelpers";
import Sidebar from "components/modules/sidebar/sidebar";
import Topbar from "@/components/modules/topbar/topbar";
import { redirect } from "next/navigation";
import React from "react";
import styles from "styles/p-user/userPanelLayout.module.css";

const Layout = async ({ children }: { readonly children: React.ReactNode }) => {
  const isUser = await authUser();

  if (!isUser) {
    return redirect("/login-register");
  }
  let typedUser;

  if (typeof isUser === "object") {
    typedUser = JSON.parse(JSON.stringify(isUser)) as {
      _id: string;
      name: string;
      role: "ADMIN" | "USER";
    };
  }

  if (typedUser?.role === "ADMIN") {
    return redirect("/p-admin");
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
};

export default Layout;
