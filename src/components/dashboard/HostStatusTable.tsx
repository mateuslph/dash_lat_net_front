import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import type {
  LatestPingByHost,
} from "../../types/ping";

interface HostStatusTableProps {
  hosts: string[];
  latestByHost: LatestPingByHost;
}

export default function HostStatusTable({
  hosts,
  latestByHost,
}: HostStatusTableProps) {
  return (
    <Paper
      sx={{
        padding: 3,
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        gutterBottom
      >
        Status atual dos hosts
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Host
            </TableCell>

            <TableCell>
              Status
            </TableCell>

            <TableCell>
              Latência
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {hosts.map((host) => {
            const item =
              latestByHost[host];

            const online =
              item?.reachable ??
              false;

            return (
              <TableRow
                key={host}
              >
                <TableCell>
                  <Typography
                    fontWeight="bold"
                  >
                    {host}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Chip
                    label={
                      online
                        ? "ONLINE"
                        : "OFFLINE"
                    }
                    color={
                      online
                        ? "success"
                        : "error"
                    }
                    size="small"
                  />
                </TableCell>

                <TableCell>
                  {item?.latency !==
                    null &&
                  item?.latency !==
                    undefined
                    ? `${item.latency} ms`
                    : "-"}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}