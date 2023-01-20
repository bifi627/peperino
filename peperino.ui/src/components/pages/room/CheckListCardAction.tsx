import router from "next/router";
import { KnownRoutes } from "../../../lib/routing/knownRoutes";
import { useApplicationState } from "../../../lib/state/ApplicationState";
import { CardAction, MyCardActionProps } from "../../Common/Cards/CardAction";

interface Props extends Omit<MyCardActionProps, "actions"> {
    slug: string;
};

export const CheckListCardAction = (props: Props) => {
    const { slug } = props;
    const appFrame = useApplicationState().getAppFrame();

    return (
        <CardAction {...props} actions={[{
            id: slug,
            action: async () => {
                await appFrame.withLoadingScreen(async () => {
                    await router.push(KnownRoutes.CheckList(slug));
                });
            }
        }]} />
    );
}