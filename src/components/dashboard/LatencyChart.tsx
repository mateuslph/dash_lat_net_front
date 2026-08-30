import {
  useMemo,
} from "react";

import {
  Box,
  Paper,
  Typography,
} from "@mui/material";

import {
  Line,
} from "react-chartjs-2";

import type {
  PingResponseDTO,
} from "../../types/ping";

interface LatencyChartProps {
  data: PingResponseDTO[];
  hosts: string[];
}

/**
 * Paleta usada para diferenciar
 * visualmente cada host.
 */
const HOST_COLORS = [
  "#1976d2",
  "#2e7d32",
  "#ed6c02",
  "#d32f2f",
  "#9c27b0",
  "#795548",
  "#00acc1",
  "#e91e63",
  "#5e35b1",
  "#00897b",
];

export default function LatencyChart({
  data,
  hosts,
}: LatencyChartProps) {
  const lineData =
    useMemo(() => {
      const datasets =
        hosts.map(
          (host, index) => {
            const color =
              HOST_COLORS[
                index %
                  HOST_COLORS.length
              ];

            return {
              label: host,

              /**
               * Cada dataset representa
               * somente um host.
               */
              data: data.map(
                (item) => {
                  if (
                    item.host !==
                    host
                  ) {
                    return null;
                  }

                  return (
                    item.latency ??
                    0
                  );
                }
              ),

              borderColor:
                color,

              backgroundColor:
                color,

              tension: 0.3,

              fill: false,

              pointRadius: 3,

              pointHoverRadius: 6,

              spanGaps: true,

              borderWidth: 2,
            };
          }
        );

      return {
        labels: data.map(
          (_, index) =>
            index + 1
        ),

        datasets,
      };
    }, [data, hosts]);

  return (
    <Paper
      sx={{
        padding: 3,
        height: "100%",
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        gutterBottom
      >
        Latência ao longo do tempo
      </Typography>

      <Box
        sx={{
          height: 350,
        }}
      >
        <Line
          data={lineData}
          options={{
            responsive: true,

            maintainAspectRatio:
              false,

            interaction: {
              mode: "index",
              intersect: false,
            },

            plugins: {
              legend: {
                display: true,
                position: "top",
              },

              tooltip: {
                mode: "index",
                intersect: false,
              },
            },

            scales: {
              y: {
                beginAtZero: true,

                title: {
                  display: true,
                  text:
                    "Latência (ms)",
                },
              },

              x: {
                title: {
                  display: true,
                  text: "Amostras",
                },
              },
            },
          }}
        />
      </Box>
    </Paper>
  );
}