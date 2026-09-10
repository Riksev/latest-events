import { createServer } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createServer();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        redirect("/profile");
    }

    return <>{children}</>;
}
