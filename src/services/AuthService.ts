import { api } from "./api";
import type { LoginRequest } from "../types/LoginRequest";
import type { LoginResponse } from "../types/LoginResponse";

export async function login(
    request: LoginRequest
): Promise<LoginResponse> {

    const response = await api.post<LoginResponse>(
        "/Auth/login",
        request
    );

    return response.data;
}