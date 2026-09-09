import AuthForm from "@/components/AuthForm";
import SignOutForm from "@/components/SignOutForm";
import { createServer } from "@/utils/supabase/server";

export default async function ProfilePage() {
    const supabase = await createServer();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    return (
        <div className="profile_page">
            {user ? (
                <>
                    <h1>My Profile</h1>
                    <SignOutForm />
                </>
            ) : (
                <AuthForm />
            )}
        </div>
    );
}
