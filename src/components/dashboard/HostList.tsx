import {
  Box,
  Chip,
  Divider,
  Paper,
  Typography,
} from "@mui/material";

import type {
  LatestPingByHost,
} from "../../types/ping";

interface HostListProps {
  hosts: string[];
  latestByHost: LatestPingByHost;
}

export default function HostList({
  hosts,
  latestByHost,
}: HostListProps) {
  return (
    <Paper
      sx={{
        padding: 3,
        marginBottom: 3,
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        gutterBottom
      >
        Hosts monitorados
      </Typography>

      <Divider
        sx={{
          marginBottom: 2,
        }}
      />

      {hosts.length === 0 ? (
        <Typography
          color="text.secondary"
        >
          Nenhum host encontrado.
        </Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          {hosts.map((host) => {
            const latest =
              latestByHost[host];

            const online =
              latest?.reachable ??
              false;

            return (
              <Chip
                key={host}
                label={`${host} — ${
                  online
                    ? "ONLINE"
                    : "OFFLINE"
                }`}
                color={
                  online
                    ? "success"
                    : "error"
                }
                variant="outlined"
              />
            );
          })}
        </Box>
      )}
    </Paper>
  );
}