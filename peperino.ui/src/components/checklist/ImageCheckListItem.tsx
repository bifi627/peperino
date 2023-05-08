import { Delete, MoreVert, OpenInBrowser } from "@mui/icons-material";
import { Box, IconButton, Popover } from "@mui/material";
import Image from "next/image";
import { useRef, useState } from "react";
import { ImageCheckListItemOutDto, OpenAPI } from "../../lib/api";

interface Props {
    item: ImageCheckListItemOutDto;
    contextId: number;
    checkListSlug: string;
    onDelete: (item: ImageCheckListItemOutDto) => void;
    onUpdate: (item: ImageCheckListItemOutDto) => void;
}
export const ImageCheckListItem = (props: Props) => {

    const src = `${OpenAPI.BASE}/api/ImageStore/${props.contextId}/${props.item.imageReference}`

    const [optionsOpened, setOptionsOpened] = useState(false);
    const ref = useRef<HTMLButtonElement | null>(null);

    const openLink = async () => {
        window.open(src, "_blank")?.focus();
    }

    return (
        <>
            <Box width="100%" height="200px" position="relative">
                <Image layout={"fill"} objectFit="contain" src={src} alt={props.item.imageReference}></Image>
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
            </Popover >
        </>
    );
}