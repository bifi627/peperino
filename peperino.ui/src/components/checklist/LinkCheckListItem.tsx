import { Delete, FileCopy, MoreVert, OpenInBrowser } from "@mui/icons-material";
import { Box, IconButton, Popover } from "@mui/material";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { LinkCheckListItemOutDto } from "../../lib/api";

interface Props {
    item: LinkCheckListItemOutDto;
    checkListSlug: string;
    onDelete: (item: LinkCheckListItemOutDto) => void;
    onUpdate: (item: LinkCheckListItemOutDto) => void;
}

export const LinkCheckListItem = (props: Props) => {

    const linkWithProtocol = props.item.link.startsWith("http") ? props.item.link : `https://${props.item.link}`;
    const titleWithFallBack = props.item.title !== "" ? props.item.title : props.item.link;

    const [optionsOpened, setOptionsOpened] = useState(false);
    const ref = useRef<HTMLButtonElement | null>(null);

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(linkWithProtocol);
        setOptionsOpened(false);
        toast.success("Link wurde in die Zwischenablage kopiert");
    };

    const openLink = async () => {
        window.open(linkWithProtocol, "_blank")?.focus();
    }

    return (
        <>
            <Box width="calc(100% - 90px)">
                <a style={{ display: "block", textOverflow: "ellipsis", overflow: "hidden" }} target={"_blank"} href={linkWithProtocol} rel="noreferrer">{titleWithFallBack}</a>
            </Box>
            <IconButton ref={ref}>
                <MoreVert onClick={() => setOptionsOpened(true)} />
            </IconButton>
            <Popover
                open={optionsOpened}
                anchorEl={ref.current}
                onClose={() => setOptionsOpened(false)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Box display="flex" flexDirection="row" gap="6px" onClick={openLink}>
                    <IconButton>
                        <OpenInBrowser />
                    </IconButton>
                    <p>Öffnen</p>
                </Box>
                <Box display="flex" flexDirection="row" gap="6px" onClick={copyToClipboard}>
                    <IconButton>
                        <FileCopy />
                    </IconButton>
                    <p>Kopieren</p>
                </Box>
                <Box display="flex" flexDirection="row" gap="6px" sx={{ paddingRight: "20px" }} onClick={async () => {
                    props.onDelete(props.item);
                }}>
                    <IconButton color="error">
                        <Delete />
                    </IconButton>
                    <p style={{ color: "#f4433" }}>
                        Löschen
                    </p>
                </Box>
            </Popover>
        </>
    );
}