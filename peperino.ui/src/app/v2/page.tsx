import { getServerAuthState } from "@/lib/auth/server/apiClient";
import { Home } from "./(components)/home/Home";
import { LoginHint } from "./(components)/home/LoginHint";
import { Logo } from "./(components)/home/Logo";
import { UserHint } from "./(components)/home/UserHint";

export const dynamic = "force-dynamic";

export default function Page() {
    const isLoggedIn = getServerAuthState();

    return (
        <main>
            {isLoggedIn && <UserHint />}
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Logo />
            </div>
            {!isLoggedIn && <LoginHint />}
            {isLoggedIn && <Home />}
        </main>
    );
}
