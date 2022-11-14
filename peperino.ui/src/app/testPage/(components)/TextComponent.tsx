import { use } from "react";

const getValue = (ms: number) => {
    return new Promise<string>((resolve) => {
        setTimeout(() => {
            resolve(`${ms}`);
        }, ms);
    })
}

export const TextComponent = ({ ms }: { ms: number }) => {
    const value = use(getValue(ms));
    return <p>{`Hello, Next.js ${ms} ${value}`}</p>;
}