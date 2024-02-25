"use client";
import { useRouter } from "next/navigation";
import { useAppFrameStore } from "../../../(components)/state/appFrameState";
import { CardAction, MyCardActionProps } from "../../../../components/Common/Cards/CardAction";
import { KnownRoutes } from "../../../../lib/routing/knownRoutes";

interface Props extends Omit<MyCardActionProps, "actions"> {
    slug: string;
}

export const RoomCardAction = (props: Props) => {
    const { slug } = props;
    const appFrame = useAppFrameStore();
    const router = useRouter();

    return (
        <CardAction
            {...props}
            actions={[
                {
                    id: slug,
                    action: async () => {
                        await appFrame.withLoading(() => {
                            router.push(KnownRoutes.V2.Room(slug));
                        });
                    },
                },
            ]}
        />
    );
};
