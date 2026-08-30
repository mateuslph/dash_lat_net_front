import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  MAX_LOGS,
  UPDATE_INTERVAL,
} from "../config/api";

import {
  getPingLogs,
} from "../services/pingService";

import type {
  PingResponseDTO,
} from "../types/ping";

interface UsePingLogsResult {
  data: PingResponseDTO[];
  loading: boolean;
  backendError: boolean;
  refresh: () => Promise<void>;
}

export function usePingLogs(): UsePingLogsResult {
  const [data, setData] = useState<
    PingResponseDTO[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [backendError, setBackendError] =
    useState(false);

  /**
   * Busca os logs do backend.
   */
  const refresh = useCallback(async () => {
    try {
      const logs =
        await getPingLogs();

      /**
       * Mantém somente os últimos
       * MAX_LOGS registros.
       */
      const latestLogs =
        logs.slice(-MAX_LOGS);

      setData(latestLogs);

      setBackendError(false);
    } catch (error) {
      console.error(
        "Erro ao buscar logs de ping:",
        error
      );

      setBackendError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Polling automático.
   */
  useEffect(() => {
    /**
     * Busca imediatamente.
     */
    void refresh();

    /**
     * Depois atualiza a cada
     * UPDATE_INTERVAL.
     */
    const interval =
      window.setInterval(() => {
        void refresh();
      }, UPDATE_INTERVAL);

    return () => {
      window.clearInterval(interval);
    };
  }, [refresh]);

  return {
    data,
    loading,
    backendError,
    refresh,
  };
}