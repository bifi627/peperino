import { FullLoadingPage } from "../../loadingScreen/FullLoadingPage";
interface Props {
    loading?: boolean
    children: React.ReactNode;
}

export const LoadingProvider = (props: Props) => {

    if (props.loading) {
        return <FullLoadingPage></FullLoadingPage>
    }

    return (
        <>
            {props.children}
        </>
    );
}