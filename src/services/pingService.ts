import axios from "axios";

import { API_URL } from "../config/api";

import type {
  PingResponseDTO,
} from "../types/ping";

/**
 * Busca os logs de ping do backend.
 */
export async function getPingLogs(): Promise<
  PingResponseDTO[]
> {
  const response =
    await axios.get<PingResponseDTO[]>(
      `${API_URL}/logs`
    );

  return response.data;
}