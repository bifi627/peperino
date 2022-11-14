import { AccountBox, ChevronRight, Groups } from "@mui/icons-material";
import { Box, useTheme } from "@mui/material";
import { getAuth } from "firebase/auth";
import type { NextPage } from 'next';
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { CardAction } from "../components/Common/Cards/CardAction";
import { KnownRoutes } from "../lib/routing/knownRoutes";

const HomePage: NextPage = () => {
    const theme = useTheme();
    const router = useRouter();
    const [user, loading, error] = useAuthState(getAuth());

    if (loading) {
        return <>Loading...</>;
    }

    const gradientColor = theme.palette.mode === "dark" ? theme.palette.primary.dark : theme.palette.primary.light;

    return (
        <Box display="flex" flexDirection="column" alignItems="center" padding={3}>
            {user && <CardAction mainText={`Eingeloggt als ${user.displayName ?? user.email}`} />}
            <Image
                style={{ background: `radial-gradient(black 0%, ${gradientColor} 20%, transparent 60%)` }}
                height="200px"
                width="207px"
                layout="fixed"
                src="/images/peperino_large.png"
                alt="logo">
            </Image>
            {user ?
                <>
                    <CardAction
                        mainText="Meine Räume"
                        leftIcon={<Groups />}
                        actions={[{
                            id: "groups",
                            action: async () => await router.push(KnownRoutes.Room()),
                            icon: <ChevronRight />
                        }]}
                    />
                    {/* <CardAction
                        mainText="Mein Profil"
                        leftIcon={<VerifiedUser />}
                        disabled
                    />
                    <CardAction
                        mainText="Einstellungen"
                        leftIcon={<Settings />}
                        disabled
                    /> */}
                </>
                :
                <CardAction
                    mainText="Nicht angemeldet!"
                    subTexts={["Melde dich mit deinem Account an oder erstelle einen neuen Account."]}
                    actions={[{
                        id: "login",
                        action: async () => await router.push(KnownRoutes.Login()),
                        icon: <AccountBox />
                    }]}
                />
            }
        </Box>
    );
}

export default HomePage