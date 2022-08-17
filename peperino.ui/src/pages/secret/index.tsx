import { Switch } from "@mui/material";
import { GetServerSideProps } from "next";
import { WeatherForecastService } from "../../lib/api";
import { authPage, redirectLogin } from "../../lib/auth/server/authPage";

interface Props {
    text: string;
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    console.log(context.resolvedUrl);
    if (await authPage(context) === false) {
        return await redirectLogin<Props>(context.resolvedUrl);
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
            <Switch></Switch>
        </>
    );
};

export default SecretPage;