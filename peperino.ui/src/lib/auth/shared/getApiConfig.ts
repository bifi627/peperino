import { getAuth } from "firebase/auth";
import { BACKEND_URL } from "../../../shared/constants";
import { OpenAPI, OpenAPIConfig } from "../../api";

OpenAPI.BASE = BACKEND_URL.slice(0, BACKEND_URL.length - 1);

export const getApiConfig = (token = "") => {
    const apiConfig: OpenAPIConfig = { ...OpenAPI, TOKEN: token };
    return apiConfig;
}

export const getClientApiConfig = () => {
    const apiConfig: OpenAPIConfig = {
        ...OpenAPI, TOKEN: async () => (await getAuth().currentUser?.getIdToken()) ?? ""
    };
    return apiConfig;
}
