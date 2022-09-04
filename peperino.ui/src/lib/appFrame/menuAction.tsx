import React from "react";

export interface MenuAction {
    id: string;
    text: string;
    action: () => Promise<unknown>;
    keepMenuOpen?: boolean;
    icon?: React.ReactNode;
}

