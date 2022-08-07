import { GetServerSideProps } from "next";
import { WeatherForecastService } from "../../lib/api";
import { authPage, redirectLogin } from "../../lib/auth/server/authPage";

interface Props {
    text: string;
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    if (await authPage(context) === false) {
        return redirectLogin<Props>();
    }

    const x = await WeatherForecastService.getWeatherForecastAuth();

    return {
        props: {
            text: x.toLocaleString()
        }
    };
}

const SecretPage = (p: Props) => {
    return (
        <>
            Secret
            {p.text}
        </>
    );
};

export default SecretPage;