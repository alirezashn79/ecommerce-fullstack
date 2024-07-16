import { authUser } from "@/utils/serverHelpers";
import Sidebar from "components/modules/p-user/sidebar";
import Topbar from "components/modules/p-user/topbar";
import { redirect } from "next/navigation";
import React from "react";
import styles from "styles/p-user/userPanelLayout.module.css";

const Layout = async ({ children }: { readonly children: React.ReactNode }) => {
  const isUser = await authUser();

  if (!isUser) {
    return redirect("/login-register");
  }
  return (
    <div className={styles.layout}>
      <section className={styles.section}>
        <Sidebar />
        <div className={styles.contents}>
          <Topbar />
          {children}
        </div>
      </section>
    </div>
  );
};

export default Layout;
