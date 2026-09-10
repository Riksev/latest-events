import SignOutForm from "@/components/SignOutForm";
import { createServer } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
    const supabase = await createServer();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <div className="profile_page">
            <h1>My Profile</h1>
            <p className="text-mist-500 mt-2">Logged in as: {user.email}</p>
            <SignOutForm />
        </div>
    );
}
