import { useRouter } from "next/router";
import { UserGroupOutDto } from "../../lib/api";
import { KnownRoutes } from "../../lib/routing/knownRoutes";

interface Props {
    group: UserGroupOutDto;
}

export const GroupListItem = (props: Props) => {
    const router = useRouter();

    return (
        <>
            <div onClick={() => {
                router.push(KnownRoutes.Group(props.group.groupNameSlug));
            }}>
                Name: {props.group.groupName}
                <br />
                Slug: {props.group.groupNameSlug}
            </div>
        </>
    );
}