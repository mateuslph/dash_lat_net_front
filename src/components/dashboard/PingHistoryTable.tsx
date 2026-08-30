import {
  Chip,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import type {
  PingResponseDTO,
} from "../../types/ping";

interface PingHistoryTableProps {
  data: PingResponseDTO[];
}

export default function PingHistoryTable({
  data,
}: PingHistoryTableProps) {
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
        Histórico de Pings
      </Typography>

      <Divider
        sx={{
          marginBottom: 2,
        }}
      />

      {data.length === 0 ? (
        <Typography
          color="text.secondary"
        >
          Aguardando dados do
          servidor...
        </Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                #
              </TableCell>

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
            {data
              .slice()
              .reverse()
              .map(
                (
                  item,
                  index
                ) => (
                  <TableRow
                    key={`${item.host}-${index}`}
                  >
                    <TableCell>
                      {index + 1}
                    </TableCell>

                    <TableCell>
                      {item.host}
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={
                          item.reachable
                            ? "ONLINE"
                            : "OFFLINE"
                        }
                        color={
                          item.reachable
                            ? "success"
                            : "error"
                        }
                        size="small"
                      />
                    </TableCell>

                    <TableCell>
                      {item.latency !==
                        null &&
                      item.latency !==
                        undefined
                        ? `${item.latency} ms`
                        : "-"}
                    </TableCell>
                  </TableRow>
                )
              )}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
}