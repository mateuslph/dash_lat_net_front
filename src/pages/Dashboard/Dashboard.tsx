// Dashboard.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Line, Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";
import { Container, Grid, Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

interface PingResponseDTO {
  host: string;
  reachable: boolean;
  latency: number | null;
}

export default function Dashboard() {
  const [data, setData] = useState<PingResponseDTO[]>([]);
  const host = "google.com";

  useEffect(() => {
    const fetchPing = async () => {
      try {
        const res = await axios.get<PingResponseDTO>(`http://localhost:8080/api/ping/${host}`);
        setData((prev) => [...prev, res.data]);
      } catch (err) {
        console.error(err);
      }
    };
    const interval = setInterval(fetchPing, 20000);
    return () => clearInterval(interval);
  }, []);

  const successCount = data.filter((d) => d.reachable).length;
  const failCount = data.length - successCount;
  const avgLatency = data.reduce((acc, d) => acc + (d.latency ?? 0), 0) / (data.length || 1);

  const lineData = {
    labels: data.map((_, i) => i + 1),
    datasets: [{ label: "Latência (ms)", data: data.map((d) => d.latency ?? 0), borderColor: "blue" }],
  };

  const pieData = {
    labels: ["Sucesso", "Falha"],
    datasets: [{ data: [successCount, failCount], backgroundColor: ["green", "red"] }],
  };

  const barData = {
    labels: ["Média de Latência"],
    datasets: [{ label: "ms", data: [avgLatency], backgroundColor: "orange" }],
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>Dashboard de Ping</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: "20px" }}>
            <Typography variant="h6">Latência ao longo do tempo</Typography>
            <Line data={lineData} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper style={{ padding: "20px" }}>
            <Typography variant="h6">Taxa de Sucesso</Typography>
            <Pie data={pieData} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper style={{ padding: "20px" }}>
            <Typography variant="h6">Média de Latência</Typography>
            <Bar data={barData} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper style={{ padding: "20px" }}>
            <Typography variant="h6">Histórico de Pings</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Host</TableCell>
                  <TableCell>Alcançável</TableCell>
                  <TableCell>Latência (ms)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((d, i) => (
                  <TableRow key={i}>
                    <TableCell>{d.host}</TableCell>
                    <TableCell style={{ color: d.reachable ? "green" : "red" }}>
                      {d.reachable ? "Sim" : "Não"}
                    </TableCell>
                    <TableCell>{d.latency ?? "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}