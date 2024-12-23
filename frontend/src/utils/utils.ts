import { MouseEventHandler } from "react";

export const stopBubbling: MouseEventHandler<HTMLElement> = e=> e.stopPropagation();