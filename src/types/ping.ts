export interface PingResponse {
  host: string;
  latency: number | null;
  reachable: boolean;
}

export interface PingData {
  time: string;
  host: string;
  latency: number | null;
}