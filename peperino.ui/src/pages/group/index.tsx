import { GetServerSideProps } from "next";
import { GroupListItem } from "../../components/group/GroupListItem";
import { UserGroupOutDto, UserGroupService } from "../../lib/api";
import { authPage, redirectLogin } from "../../lib/auth/server/authPage";

interface Props {
    groups: UserGroupOutDto[]
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    console.log(context.resolvedUrl);
    if (await authPage(context) === false) {
        return await redirectLogin<Props>(context.resolvedUrl);
    }

    const groups = await UserGroupService.getAll();

    return {
        props: {
            groups: groups
        }
    };
}

const GroupsPage = (props: Props) => {
    const groups = props.groups;
    return (
        <>
            <>You have access to {props.groups?.length} groups.</>
            <div>
                {groups.map(group => {
                    return (
                        <GroupListItem key={group.groupNameSlug} group={group}></GroupListItem>
                    )
                })}
            </div>
        </>
    )
}

export default GroupsPage;