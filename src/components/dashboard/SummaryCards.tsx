import {
  Grid,
  Paper,
  Typography,
} from "@mui/material";

interface SummaryCardsProps {
  hostCount: number;
  successRate: number;
  avgLatency: number;
  recordCount: number;
}

interface SummaryCardProps {
  title: string;
  value: string | number;
}

function SummaryCard({
  title,
  value,
}: SummaryCardProps) {
  return (
    <Paper
      sx={{
        padding: 3,
        height: "100%",
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
      >
        {title}
      </Typography>

      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{
          marginTop: 1,
        }}
      >
        {value}
      </Typography>
    </Paper>
  );
}

export default function SummaryCards({
  hostCount,
  successRate,
  avgLatency,
  recordCount,
}: SummaryCardsProps) {
  return (
    <Grid
      container
      spacing={3}
      sx={{
        marginBottom: 3,
      }}
    >
      <Grid
        size={{
          xs: 12,
          sm: 6,
          md: 3,
        }}
      >
        <SummaryCard
          title="Hosts"
          value={hostCount}
        />
      </Grid>

      <Grid
        size={{
          xs: 12,
          sm: 6,
          md: 3,
        }}
      >
        <SummaryCard
          title="Taxa de sucesso"
          value={`${successRate.toFixed(
            1
          )}%`}
        />
      </Grid>

      <Grid
        size={{
          xs: 12,
          sm: 6,
          md: 3,
        }}
      >
        <SummaryCard
          title="Média de latência"
          value={`${avgLatency.toFixed(
            2
          )} ms`}
        />
      </Grid>

      <Grid
        size={{
          xs: 12,
          sm: 6,
          md: 3,
        }}
      >
        <SummaryCard
          title="Registros"
          value={recordCount}
        />
      </Grid>
    </Grid>
  );
}