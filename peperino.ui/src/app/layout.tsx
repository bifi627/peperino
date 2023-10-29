import { ClientLayout } from "./(components)/ClientLayout";
import ThemeRegistry from "./ThemeRegistry";

export const metadata = {
    title: 'Next.js',
    description: 'Generated by Next.js',
}

export default function RootLayout(props: any) {
    const { children } = props;
    return (
        <html lang="en">
            <body>
                <ThemeRegistry options={{ key: 'mui' }}>
                    <ClientLayout>
                        {children}
                    </ClientLayout>
                </ThemeRegistry>
            </body>
        </html>
    )
}
