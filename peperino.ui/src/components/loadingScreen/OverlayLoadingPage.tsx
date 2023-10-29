import { CircularProgress } from "@mui/material";

interface Props {
    text?: string;
    onClick?: () => unknown;
    children: React.ReactNode;
}

export const OverlayLoadingPage = (props: Props) => {
    return (
        <>
            <div style={{ position: "relative" }}>
                <div onClick={props.onClick} style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "10px" }}>
                    <span>{props.text ?? "Lade..."}</span>
                    <CircularProgress size={"3rem"} />
                    <div style={{ position: "absolute", opacity: .3, pointerEvents: "none" }}>
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    );
}