import {
  Box,
  Chip,
  Paper,
  Typography,
} from "@mui/material";

interface DashboardHeaderProps {
  loading: boolean;
  backendError: boolean;
}

export default function DashboardHeader({
  loading,
  backendError,
}: DashboardHeaderProps) {
  const statusLabel =
    backendError
      ? "BACKEND OFFLINE"
      : loading
        ? "CONECTANDO..."
        : "MONITORAMENTO ATIVO";

  const statusColor:
    | "error"
    | "warning"
    | "success" =
    backendError
      ? "error"
      : loading
        ? "warning"
        : "success";

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: 3,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          fontWeight="bold"
        >
          Dashboard de Ping
        </Typography>

        <Chip
          label={statusLabel}
          color={statusColor}
        />
      </Box>

      {backendError && (
        <Paper
          sx={{
            padding: 2,
            marginBottom: 3,
            borderLeft:
              "5px solid",
            borderColor: "error.main",
          }}
        >
          <Typography
            color="error"
            fontWeight="bold"
          >
            Não foi possível conectar ao
            servidor Spring Boot.
          </Typography>

          <Typography
            variant="body2"
            sx={{
              marginTop: 1,
            }}
          >
            Verifique se o backend está
            executando em:
          </Typography>

          <Typography
            variant="body2"
            fontWeight="bold"
          >
            http://localhost:8080
          </Typography>
        </Paper>
      )}
    </>
  );
}