import {
  useMemo,
} from "react";

import {
  Box,
  Paper,
  Typography,
} from "@mui/material";

import {
  Pie,
} from "react-chartjs-2";

interface SuccessFailureChartProps {
  successCount: number;
  failCount: number;
}

export default function SuccessFailureChart({
  successCount,
  failCount,
}: SuccessFailureChartProps) {
  const pieData =
    useMemo(
      () => ({
        labels: [
          "Sucesso",
          "Falha",
        ],

        datasets: [
          {
            data: [
              successCount,
              failCount,
            ],

            backgroundColor: [
              "#2e7d32",
              "#d32f2f",
            ],

            borderWidth: 1,
          },
        ],
      }),
      [
        successCount,
        failCount,
      ]
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
        Sucesso x Falha
      </Typography>

      <Box
        sx={{
          height: 350,
          display: "flex",
          alignItems: "center",
          justifyContent:
            "center",
        }}
      >
        <Pie
          data={pieData}
          options={{
            responsive: true,
            maintainAspectRatio:
              false,
          }}
        />
      </Box>
    </Paper>
  );
}