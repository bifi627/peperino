import { Typography } from "@mui/material";

interface Props {
    title: string;
}
export const Titlebar = ({ title }: Props) => {
    return (
        <Typography
            sx={{ flexGrow: 1, overflow: "hidden", lineBreak: "anywhere" }}
            variant="h6"
            color="inherit"
            component="div"
        >
            {title}
        </Typography>
    );
};
