import { getAuth } from "firebase/auth";
import { BACKEND_URL } from "../shared/constants";
import { ApiError } from "./api/core/ApiError";
import { OpenAPI } from "./api/core/OpenAPI";

OpenAPI.BASE = BACKEND_URL.slice(0, BACKEND_URL.length - 1);
OpenAPI.TOKEN = async (options) => {
    const token = await getAuth().currentUser?.getIdToken() ?? "";
    return token;
};

type ValidationErrorModel = {
    message: string;
    detail: string;
    errors: string[];
    status: number;
};

class ValidationError extends ApiError {
    public readonly body!: ValidationErrorModel;
}

type ServerErrorModel = {
    error: string;
};

class ServerError extends ApiError {
    public readonly body!: ServerErrorModel;
}

export function isValidationError(error: ApiError): error is ValidationError {
    return error?.status === 422;
}

export function isServerError(error: ApiError): error is ServerError {
    return error?.status === 500;
}

export function handleError(error: ApiError) {
    if (isValidationError(error)) {
        return error.body.errors[0];
    }
    return error.message;
}