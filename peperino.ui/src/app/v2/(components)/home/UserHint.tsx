"use client";

import { useAuthStore } from "@/app/(components)/state/authState";
import { CardAction } from "../../../../components/Common/Cards/CardAction";

export const UserHint = () => {
    const { user } = useAuthStore();
    return (
        <>
            {(user?.displayName ?? user?.email) && (
                <CardAction mainText={`Eingeloggt als ${user?.displayName ?? user?.email ?? ""}`} />
            )}
        </>
    );
};
