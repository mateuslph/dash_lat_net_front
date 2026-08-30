import {
  useMemo,
} from "react";

import {
  Box,
  Paper,
  Typography,
} from "@mui/material";

import {
  Bar,
} from "react-chartjs-2";

interface AverageLatencyChartProps {
  avgLatency: number;
}

export default function AverageLatencyChart({
  avgLatency,
}: AverageLatencyChartProps) {
  const barData =
    useMemo(
      () => ({
        labels: [
          "Média de Latência",
        ],

        datasets: [
          {
            label: "ms",

            data: [
              Number(
                avgLatency.toFixed(
                  2
                )
              ),
            ],

            backgroundColor:
              "#ed6c02",

            borderWidth: 1,
          },
        ],
      }),
      [avgLatency]
    );

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
        Média de Latência
      </Typography>

      <Box
        sx={{
          height: 350,
        }}
      >
        <Bar
          data={barData}
          options={{
            responsive: true,

            maintainAspectRatio:
              false,

            scales: {
              y: {
                beginAtZero: true,

                title: {
                  display: true,
                  text: "ms",
                },
              },
            },
          }}
        />
      </Box>
    </Paper>
  );
}