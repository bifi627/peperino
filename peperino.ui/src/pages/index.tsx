import { AccountBox, ChevronRight, Groups, Star } from "@mui/icons-material";
import { Box, useTheme } from "@mui/material";
import { getAuth } from "firebase/auth";
import type { NextPage } from 'next';
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { CardAction } from "../components/Common/Cards/CardAction";
import { AppFrame } from "../components/appFrame/AppFrame";
import { FullLoadingPage } from "../components/loadingScreen/FullLoadingPage";
import { FavoritesQueries } from "../hooks/queries/favoritesQueries";
import { KnownRoutes } from "../lib/routing/knownRoutes";

const HomePage: NextPage = () => {
    const theme = useTheme();
    const router = useRouter();
    const [user, loading, error] = useAuthState(getAuth());

    const favoriteCheckListsQuery = FavoritesQueries.useGetFavoriteCheckListsQuery();
    const favoriteCheckListsData = favoriteCheckListsQuery.data;

    if (loading) {
        return <AppFrame><FullLoadingPage /></AppFrame>;
    }

    const gradientColor = theme.palette.mode === "dark" ? theme.palette.primary.dark : theme.palette.primary.light;

    return (
        <AppFrame toolbarText="Peperino">
            <Box display="flex" flexDirection="column" alignItems="center" padding={3}>
                {user && <CardAction mainText={`Eingeloggt als ${user.displayName ?? user.email}`} />}
                <Image
                    style={{ background: `radial-gradient(black 0%, ${gradientColor} 20%, transparent 60%)` }}
                    height="200"
                    width="207"
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
                        {(favoriteCheckListsData && favoriteCheckListsData.length > 0) &&
                            <>
                                {favoriteCheckListsData.map(c =>
                                    <CardAction
                                        key={c.id}
                                        mainText={c.name}
                                        leftIcon={<Star />}
                                        subTexts={[c.room.roomName]}
                                        actions={[{
                                            id: "open",
                                            action: async () => await router.push(KnownRoutes.CheckList(c.slug)),
                                            icon: <ChevronRight />
                                        }]}
                                    />
                                )}
                            </>
                        }
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
        </AppFrame>
    );
}

export default HomePage