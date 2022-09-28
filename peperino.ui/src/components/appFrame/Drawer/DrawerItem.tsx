import { makeAutoObservable } from "mobx";
import React from "react";

export interface DrawerItemInterface {
    text: string;
    icon: React.ReactNode;
    action?: () => Promise<unknown>;
    isSelected: boolean;
    childItems: DrawerItemInterface[];
}

export class DrawerItem implements DrawerItemInterface {
    public text = "";
    public childItems: DrawerItemInterface[] = [];
    public isSelected = false;

    icon: React.ReactNode;
    action?: (() => Promise<unknown>) | undefined;

    constructor() {
        makeAutoObservable(this);
    }
}