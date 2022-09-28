import React from "react";

export interface Action {
    id: string;
    action: () => Promise<unknown> | Awaited<unknown>;
    disabled?: boolean;
    destructive?: boolean;
}

export interface TextAction extends Action {
    text?: string;
}

export interface ButtonAction extends TextAction {
    icon?: React.ReactNode;
}

export interface MenuAction extends ButtonAction {
    keepMenuOpen?: boolean;
}
