export interface PingResponseDTO {
  host: string;
  reachable: boolean;
  latency: number | null;
}

export type LatestPingByHost = Record<
  string,
  PingResponseDTO
>;