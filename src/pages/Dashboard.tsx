import {
  useMemo,
} from "react";

import {
  Box,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import "chart.js/auto";

import {
  UPDATE_INTERVAL,
} from "../config/api";

import {
  usePingLogs,
} from "../hooks/usePingLogs";

import type {
  LatestPingByHost,
} from "../types/ping";

import DashboardHeader from "../components/dashboard/DashboardHeader";

import HostList from "../components/dashboard/HostList";

import SummaryCards from "../components/dashboard/SummaryCards";

import LatencyChart from "../components/dashboard/LatencyChart";

import SuccessFailureChart from "../components/dashboard/SuccessFailureChart";

import AverageLatencyChart from "../components/dashboard/AverageLatencyChart";

import HostStatusTable from "../components/dashboard/HostStatusTable";

import PingHistoryTable from "../components/dashboard/PingHistoryTable";

export default function Dashboard() {
  /**
   * =====================================================
   * DADOS DA API
   * =====================================================
   */

  const {
    data,
    loading,
    backendError,
  } = usePingLogs();

  /**
   * =====================================================
   * HOSTS EXISTENTES
   * =====================================================
   */

  const hosts =
    useMemo(() => {
      return Array.from(
        new Set(
          data.map(
            (item) =>
              item.host
          )
        )
      );
    }, [data]);

  /**
   * =====================================================
   * ÚLTIMO RESULTADO POR HOST
   * =====================================================
   */

  const latestByHost =
    useMemo<LatestPingByHost>(
      () => {
        const result:
          LatestPingByHost =
          {};

        data.forEach(
          (item) => {
            result[
              item.host
            ] = item;
          }
        );

        return result;
      },
      [data]
    );

  /**
   * =====================================================
   * SUCESSOS
   * =====================================================
   */

  const successCount =
    useMemo(() => {
      return data.filter(
        (item) =>
          item.reachable
      ).length;
    }, [data]);

  /**
   * =====================================================
   * FALHAS
   * =====================================================
   */

  const failCount =
    useMemo(() => {
      return data.filter(
        (item) =>
          !item.reachable
      ).length;
    }, [data]);

  /**
   * =====================================================
   * LATÊNCIAS VÁLIDAS
   * =====================================================
   */

  const validLatencies =
    useMemo(() => {
      return data
        .filter(
          (item) =>
            item.reachable &&
            item.latency !==
              null
        )
        .map(
          (item) =>
            item.latency as number
        );
    }, [data]);

  /**
   * =====================================================
   * MÉDIA DE LATÊNCIA
   * =====================================================
   */

  const avgLatency =
    useMemo(() => {
      if (
        validLatencies.length ===
        0
      ) {
        return 0;
      }

      const total =
        validLatencies.reduce(
          (
            sum,
            latency
          ) =>
            sum +
            latency,
          0
        );

      return (
        total /
        validLatencies.length
      );
    }, [validLatencies]);

  /**
   * =====================================================
   * TAXA DE SUCESSO
   * =====================================================
   */

  const successRate =
    useMemo(() => {
      if (
        data.length === 0
      ) {
        return 0;
      }

      return (
        (successCount /
          data.length) *
        100
      );
    }, [
      successCount,
      data.length,
    ]);

  /**
   * =====================================================
   * RENDER
   * =====================================================
   */

  return (
    <Container
      maxWidth="lg"
      sx={{
        marginTop: 3,
        marginBottom: 5,
      }}
    >
      {/* ===============================================
          CABEÇALHO
          =============================================== */}

      <DashboardHeader
        loading={loading}
        backendError={
          backendError
        }
      />

      {/* ===============================================
          HOSTS
          =============================================== */}

      <HostList
        hosts={hosts}
        latestByHost={
          latestByHost
        }
      />

      {/* ===============================================
          RESUMO
          =============================================== */}

      <SummaryCards
        hostCount={
          hosts.length
        }
        successRate={
          successRate
        }
        avgLatency={
          avgLatency
        }
        recordCount={
          data.length
        }
      />

      {/* ===============================================
          GRÁFICOS E TABELAS
          =============================================== */}

      <Grid
        container
        spacing={3}
      >
        {/* LATÊNCIA */}

        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <LatencyChart
            data={data}
            hosts={hosts}
          />
        </Grid>

        {/* SUCESSO / FALHA */}

        <Grid
          size={{
            xs: 12,
            md: 3,
          }}
        >
          <SuccessFailureChart
            successCount={
              successCount
            }
            failCount={
              failCount
            }
          />
        </Grid>

        {/* MÉDIA */}

        <Grid
          size={{
            xs: 12,
            md: 3,
          }}
        >
          <AverageLatencyChart
            avgLatency={
              avgLatency
            }
          />
        </Grid>

        {/* STATUS ATUAL */}

        <Grid
          size={{
            xs: 12,
          }}
        >
          <HostStatusTable
            hosts={
              hosts
            }
            latestByHost={
              latestByHost
            }
          />
        </Grid>

        {/* HISTÓRICO */}

        <Grid
          size={{
            xs: 12,
          }}
        >
          <PingHistoryTable
            data={data}
          />
        </Grid>
      </Grid>

      {/* ===============================================
          RODAPÉ
          =============================================== */}

      <Box
        sx={{
          marginTop: 3,
          textAlign:
            "center",
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
        >
          Atualização automática
          a cada{" "}
          {UPDATE_INTERVAL /
            1000}{" "}
          segundos
        </Typography>
      </Box>
    </Container>
  );
}