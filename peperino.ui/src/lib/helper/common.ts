import { AccessLevel } from "../api";

export function arrayMoveMutable(array: any[], fromIndex: number, toIndex: number) {
    const startIndex = fromIndex < 0 ? array.length + fromIndex : fromIndex;

    if (startIndex >= 0 && startIndex < array.length) {
        const endIndex = toIndex < 0 ? array.length + toIndex : toIndex;

        const [item] = array.splice(fromIndex, 1);
        array.splice(endIndex, 0, item);
    }
}

export function isClient() {
    return !isServer();
}

export function isServer() {
    return typeof window === "undefined";
}

/**
 * Select file(s).
 * @param {String} contentType The content type of files you wish to select. For instance, use "image/*" to select all types of images.
 * @param {Boolean} multiple Indicates if the user can select multiple files.
 * @returns {Promise<File|File[]>} A promise of a file or array of files in case the multiple parameter is true.
 */
export function selectFile(contentType: string, multiple = false) {
    return new Promise<File[]>((resolve, reject) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.multiple = multiple;
        input.accept = contentType;

        input.onchange = () => {
            const files = Array.from(input.files ?? []);
            resolve(files);
        };

        input.onerror = (err) => {
            reject(err);
        }

        input.click();
    });
}

export const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString() ?? "");
    reader.onerror = error => reject(error);
});

type AccessComparison = "min" | "equal";

export const checkAccessLevel = (requested: AccessLevel, check?: AccessLevel, comparison: AccessComparison = "min") => {
    if (!check) {
        return false;
    }

    if (comparison === "equal") {
        return requested === check;
    }

    const accessOrder: AccessLevel[] = [
        "None",
        "Read",
        "WriteContent",
        "Write",
        "Delete",
        "Owner"
    ];

    const requestedIndex = accessOrder.indexOf(requested);
    const checkIndex = accessOrder.indexOf(check);

    if (comparison === "min") {
        return checkIndex >= requestedIndex;
    }

    return false;
}

export const isValidHttpUrl = (string: string) => {
    let url;
    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
}