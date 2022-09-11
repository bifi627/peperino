import { observer } from "mobx-react";
import { GetServerSideProps } from "next";
import { FullLoadingPage } from "../../components/loadingScreen/FullLoadingPage";
import { withAuth } from "../../lib/auth/server/authPage";
import { KnownRoutes } from "../../lib/routing/knownRoutes";

interface Props {
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    return withAuth(context, [], async (result) => {
        const slug = context.query["slug"] as string;

        try {
            const sharedLinkResponse = await result.api.sharedLink.executeSharedLink(slug);
            if (sharedLinkResponse.entityType === "Room") {
                return {
                    props: {
                    },
                    redirect: {
                        destination: KnownRoutes.Room(sharedLinkResponse.slug),
                    }
                };
            }
        } catch (error: any) {
            console.error(error);
        }

        return {
            props: {
            },
        }
    });
}

const SharedLinkPage = observer((props: Props) => {
    return (
        <FullLoadingPage text="Der Link ist abgelaufen oder existiert nicht..." />
    );
});

export default SharedLinkPage;