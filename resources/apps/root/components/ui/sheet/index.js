import { cva } from "class-variance-authority";

export { default as Sheet } from "./sheet.vue";
export { default as SheetClose } from "./sheet-close.vue";
export { default as SheetContent } from "./sheet-content.vue";
export { default as SheetTrigger } from "./sheet-trigger.vue";

export const sheetVariants = cva("sheet", {
    variants: {
        side: {
            top: "sheet-top",
            bottom: "sheet-bottom",
            left: "sheet-left",
            right: "sheet-right",
        },
    },
    defaultVariants: {
        side: "right",
    },
});
