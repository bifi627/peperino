import { Groups, Login, Settings, VerifiedUser } from "@mui/icons-material";
import { Box, useTheme } from "@mui/material";
import { getAuth } from "firebase/auth";
import type { NextPage } from 'next';
import Image from "next/image";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { CardListItem } from "../components/room/overview/CardListItem";
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
            {user && <CardListItem mainText={`Eingeloggt mit ${user.displayName ?? user.email}`} />}
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
                    <CardListItem
                        mainText="Öffne meine Räume"
                        leftIcon={<Groups />}
                        onSelect={async () => {
                            await router.push(KnownRoutes.Room())
                        }}
                    />
                    <CardListItem
                        disabled
                        mainText="Öffne mein Profil"
                        leftIcon={<VerifiedUser />}
                        onSelect={async () => {
                        }}
                    />
                    <CardListItem
                        mainText="Öffne Einstellungen"
                        leftIcon={<Settings />}
                        disabled
                        onSelect={async () => {
                        }}
                    />
                </>
                :
                <CardListItem
                    mainText="Nicht eingeloggt!"
                    subTexts={["Melde dich mit deinem Account an oder erstelle einen Neuen"]}
                    rightIcon={<Login />}
                    onSelect={async () => {
                        await router.push(KnownRoutes.Login())
                    }}
                />
            }
        </Box>
    );
}

export default HomePage