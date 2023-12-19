import { makeAutoObservable } from "mobx";
import React from "react";

export interface DrawerItemInterface {
    text: string;
    icon: React.ReactNode;
    action?: () => Promise<unknown> | unknown;
    isSelected: boolean;
    childItems?: DrawerItemInterface[];
    visible: boolean;
}

export class DrawerItem implements DrawerItemInterface {
    public text = "";
    public childItems: DrawerItemInterface[] = [];
    public isSelected = false;
    public visible = true;

    icon: React.ReactNode;
    action?: (() => Promise<unknown>) | undefined;

    constructor() {
        makeAutoObservable(this);
    }
}
