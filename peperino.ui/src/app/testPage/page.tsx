import { Suspense } from "react";
import { TextComponent } from "./(components)/TextComponent";
import Loading from "./loading";

const f = async () => {
    return (
        <>
            <Suspense fallback={<Loading></Loading>}>
                <TextComponent ms={1000}></TextComponent>
            </Suspense>
            <Suspense fallback={<Loading></Loading>}>
                <TextComponent ms={2000}></TextComponent>
            </Suspense>
            <Suspense fallback={<Loading></Loading>}>
                <TextComponent ms={3000}></TextComponent>
            </Suspense>
            <Suspense fallback={<Loading></Loading>}>
                <TextComponent ms={4000}></TextComponent>
            </Suspense>
            <Suspense fallback={<Loading></Loading>}>
                <TextComponent ms={5000}></TextComponent>
            </Suspense>
        </>
    )
}

export default f;