"use client";
import { CardAction } from "@/components/Common/Cards/CardAction";
import { ChevronRight, Groups } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { KnownRoutes } from "../../../../lib/routing/knownRoutes";

export const Home = () => {
    const router = useRouter();
    router.prefetch(KnownRoutes.V2.RoomOverview());
    return (
        <>
            <CardAction
                mainText="Meine Räume"
                leftIcon={<Groups />}
                actions={[
                    {
                        id: "groups",
                        action: () => router.push(KnownRoutes.V2.RoomOverview()),
                        icon: <ChevronRight />,
                    },
                ]}
            />
        </>
    );
};
