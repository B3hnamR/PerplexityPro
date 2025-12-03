import { auth } from "@/auth";
import styles from "./layout.module.css";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    return (
        <div className={styles.layout}>
            {session && <AdminSidebar />}
            <main className={styles.main}>{children}</main>
        </div>
    );
}
