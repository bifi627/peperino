import { observer } from "mobx-react";
import { GetServerSideProps } from "next";
import { FullLoadingPage } from "../../components/loadingScreen/FullLoadingPage";
import { SharedLinkService } from "../../lib/api";
import { authPage, redirectLogin } from "../../lib/auth/server/authPage";
import { KnownRoutes } from "../../lib/routing/knownRoutes";

interface Props {
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    console.log(context.resolvedUrl);
    if (await authPage(context) !== "VALID") {
        return await redirectLogin<Props>(context.resolvedUrl);
    }

    const slug = context.query["slug"] as string;

    try {
        const sharedLinkResponse = await SharedLinkService.executeSharedLink(slug);
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
        // notFound: true,
        // redirect: {
        //     destination: KnownRoutes.Root(),
        // }
    }
}

const SharedLinkPage = observer((props: Props) => {
    return (
        <FullLoadingPage text="Der Link ist abgelaufen oder existiert nicht..." />
    );
});

export default SharedLinkPage;