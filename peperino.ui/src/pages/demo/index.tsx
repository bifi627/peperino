import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { GetServerSideProps } from "next";
import { Dispatch, SetStateAction, useState } from "react";
import { AppFrameConfig } from "../../lib/appFrame/AppFrameConfig";
import { authPage, redirectLogin } from "../../lib/auth/server/authPage";

interface Props {
    index: number;
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    console.log(context.resolvedUrl);
    if (await authPage(context) === false) {
        return await redirectLogin<Props>(context.resolvedUrl);
    }

    return {
        props: {
            index: 0
        }
    };
}

let updater: Dispatch<SetStateAction<number>>;

const SecretPage = (p: Props) => {
    const [index, setIndex] = useState(p.index);
    updater = setIndex;

    return (
        <>
            Secret
            {index}
            <Button onClick={() => setIndex(p => p + 1)}>Increment</Button>
        </>
    );
};

export const SecretPageAppFrameConifg: AppFrameConfig = {
    contextMenuActions: [{
        action: () => {
            updater(p => p + 1);
            return Promise.resolve();
        },
        text: "TEST",
        keepMenuOpen: true,
        icon: <Add />
    },
    {
        action: () => {
            updater(p => p + 1);
            return Promise.resolve();
        },
        text: "TEST",
        icon: <Add />
    }],
}


export default SecretPage;