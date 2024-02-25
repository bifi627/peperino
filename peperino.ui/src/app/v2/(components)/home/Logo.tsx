import Image from "next/legacy/image";
export const Logo = () => {
    const gradient = "rgb(101, 49, 178)";
    return (
        <Image
            style={{ background: `radial-gradient(black 0%, ${gradient} 20%, transparent 60%)` }}
            height="200"
            width="207"
            layout="fixed"
            src="/images/peperino_large.png"
            alt="logo"
        ></Image>
    );
};
