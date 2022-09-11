import { PeperinoApiClient } from "../../api";
import { getClientApiConfig } from "../shared/getApiConfig";

export const ClientApi = new PeperinoApiClient(getClientApiConfig());