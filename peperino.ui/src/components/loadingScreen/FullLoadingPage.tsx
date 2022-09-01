import { CircularProgress } from "@mui/material";

export const FullLoadingPage = () => {
    return (
        <div style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "10px" }}>
            <span>Lade...</span>
            <CircularProgress size={"3rem"} />
        </div>
    );
}