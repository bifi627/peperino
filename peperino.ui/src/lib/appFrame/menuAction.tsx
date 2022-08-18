import React from "react";

export interface MenuAction {
    text: string;
    action: () => Promise<unknown>;
    keepMenuOpen?: boolean;
    icon?: React.ReactNode;
}

