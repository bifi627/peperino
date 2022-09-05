import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { isObservableArray } from "mobx";
import { observer } from "mobx-react";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { GroupListItem } from "../../components/group/GroupListItem";
import { UserGroupOutDto, UserGroupService } from "../../lib/api";
import { authPage, redirectLogin } from "../../lib/auth/server/authPage";
import { useApplicationState } from "../../lib/state/ApplicationState";

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

const GroupsPage = observer((props: Props) => {
    const groupsState = useApplicationState().getGroupsState();

    const [groupName, setGroupName] = useState("");

    useEffect(() => {
        if (isObservableArray(groupsState.groups)) {
            groupsState.groups.replace(props.groups);
        }
    }, [])

    return (
        <>
            <>You have access to {groupsState.groups?.length} groups.</>
            <div>
                {groupsState.groups.map(group => {
                    return (
                        <GroupListItem key={group.groupNameSlug} group={group}></GroupListItem>
                    )
                })}
            </div>
            <Dialog open={groupsState.dialogOpened} onClose={() => groupsState.dialogOpened = false}>
                <DialogTitle>Neue Gruppe erstellen</DialogTitle>
                <DialogContent>
                    <TextField
                        value={groupName}
                        onChange={(s) => { setGroupName(s.target.value) }}
                        autoComplete="off"
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => groupsState.dialogOpened = false}>Abbrechen</Button>
                    <Button onClick={async () => {
                        await groupsState.createGroup(groupName)
                        await groupsState.reloadGroups();
                        groupsState.dialogOpened = false;
                    }}>Erstellen</Button>
                </DialogActions>
            </Dialog>
        </>
    )
});

export default GroupsPage;