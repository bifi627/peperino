import { CircularProgress } from "@mui/material";

interface Props {
    text?: string;
}

export const FullLoadingPage = (props: Props) => {
    return (
        <div style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "10px" }}>
            <span>{props.text ?? "Lade..."}</span>
            <CircularProgress size={"3rem"} />
        </div>
    );
}