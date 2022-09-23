import { Box } from "@mui/material";
import { getAuth, signOut } from "firebase/auth";
import type { NextPage } from 'next';
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { KnownRoutes } from "../lib/routing/knownRoutes";

const Home: NextPage = () => {
    const [user, loading, error] = useAuthState(getAuth());

    if (loading) {
        return <>Loading...</>;
    }

    return (
        <Box padding={6}>
            {user && <>
                Signed in with {user?.displayName ?? user?.email}<br />
                <button onClick={() => signOut(getAuth())}>Sign out</button>
            </>}
            {!user && <>
                Not signed in <br />
                <Link href={KnownRoutes.Login()} passHref>
                    <button>Login</button>
                </Link>
            </>}
        </Box>
    );
}

export default Home