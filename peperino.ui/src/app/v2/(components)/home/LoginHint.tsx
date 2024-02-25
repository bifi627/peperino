"use client";
import { AccountBox } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { CardAction } from "../../../../components/Common/Cards/CardAction";
import { KnownRoutes } from "../../../../lib/routing/knownRoutes";

export const LoginHint = () => {
    const router = useRouter();
    return (
        <CardAction
            mainText="Nicht angemeldet!"
            subTexts={["Melde dich mit deinem Account an oder erstelle einen neuen Account."]}
            actions={[
                {
                    id: "login",
                    action: () => router.push(KnownRoutes.V2.Login()),
                    icon: <AccountBox />,
                },
            ]}
        />
    );
};
