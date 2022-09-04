import { GetServerSideProps } from "next";
import { UserGroupOutDto, UserGroupService } from "../../lib/api";
import { authPage, redirectLogin } from "../../lib/auth/server/authPage";
import { KnownRoutes } from "../../lib/routing/knownRoutes";

interface Props {
    group: UserGroupOutDto;
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    console.log(context.resolvedUrl);
    if (await authPage(context) === false) {
        return await redirectLogin<Props>(context.resolvedUrl);
    }

    const slug = context.query["slug"] as string;

    try {
        const group = await UserGroupService.getBySlug(slug);
        return {
            props: {
                group: group,
            }
        };
    } catch (error: any) {
        console.error(error);
        return {
            props: {
            },
            notFound: true,
            redirect: {
                destination: KnownRoutes.Group(),
            }
        }
    }
}

const GroupPage = (props: Props) => {
    return (
        <>Group Page {props.group?.groupName}</>
    );
}

export default GroupPage;