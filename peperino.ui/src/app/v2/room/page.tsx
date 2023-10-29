import { AppBar, Toolbar } from "@mui/material";

// This file maps to the index route (/)
export default function Page() {
    return (
        <main>
            <AppBar position="sticky">
                <Toolbar>
                    <span>Secret Room</span>
                </Toolbar>
            </AppBar>
        </main>
    );
}