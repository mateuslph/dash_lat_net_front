import { useMemo, useState } from "react";
import { usePing } from "../../hooks/usePing";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  // Estado que controla se o modo escuro está ativo ou não (começa desativado)
  const [isDarkMode, setIsDarkMode] = useState(false);

  const hosts = ["8.8.8.8", "1.1.1.1"];
  const rawData = usePing(hosts);

  const chartData = useMemo(() => {
    const grouped = rawData.reduce((acc: any, current) => {
      const latencyValue = current.latency === -1 ? null : current.latency;

      if (!acc[current.time]) {
        acc[current.time] = { time: current.time };
      }
      
      acc[current.time][current.host] = latencyValue;
      return acc;
    }, {});

    return Object.values(grouped);
  }, [rawData]);

  // Paleta de cores dinâmica baseada no estado isDarkMode
  const theme = {
    background: isDarkMode ? "#121212" : "#f4f4f9",
    cardBg: isDarkMode ? "#1e1e1e" : "#ffffff",
    text: isDarkMode ? "#e0e0e0" : "#333333",
    grid: isDarkMode ? "#333333" : "#e0e0e0",
    axisText: isDarkMode ? "#aaaaaa" : "#666666",
  };

  return (
    <div style={{ 
      padding: "2rem", 
      fontFamily: "sans-serif", 
      backgroundColor: theme.background, 
      color: theme.text,
      minHeight: "100vh",
      transition: "background-color 0.3s ease, color 0.3s ease" // Transição suave
    }}>
      
      {/* Cabeçalho com o botão de troca de tema */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 style={{ margin: 0 }}>
          🌐 Monitoramento de Latência
        </h1>
        
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          style={{
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            cursor: "pointer",
            backgroundColor: isDarkMode ? "#333" : "#ddd",
            color: isDarkMode ? "#fff" : "#333",
            border: "none",
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "all 0.3s ease"
          }}
        >
          {isDarkMode ? "☀️ Modo Claro" : "🌙 Modo Escuro"}
        </button>
      </div>

      {/* Container do Gráfico */}
      <div style={{ 
        width: "100%", 
        height: 450, 
        backgroundColor: theme.cardBg, 
        padding: "1.5rem", 
        borderRadius: "12px", 
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        transition: "background-color 0.3s ease"
      }}>
        
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            {/* Grade adaptável ao tema */}
            <CartesianGrid strokeDasharray="3 3" stroke={theme.grid} />
            
            {/* Eixos com cor adaptável */}
            <XAxis dataKey="time" tick={{ fill: theme.axisText, fontSize: 12 }} stroke={theme.grid} />
            <YAxis 
              tick={{ fill: theme.axisText, fontSize: 12 }} 
              stroke={theme.grid}
              label={{ value: 'Latência (ms)', angle: -90, position: 'insideLeft', fill: theme.axisText }} 
            />
            
            {/* Tooltip (caixinha ao passar o mouse) adaptável */}
            <Tooltip 
              contentStyle={{ 
                backgroundColor: theme.cardBg, 
                color: theme.text,
                borderRadius: "8px", 
                border: `1px solid ${theme.grid}`,
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)" 
              }}
            />
            <Legend verticalAlign="top" height={36} wrapperStyle={{ color: theme.text }} />

            <Line 
              type="monotone" 
              dataKey="8.8.8.8" 
              name="Google DNS"
              stroke="#8884d8" 
              strokeWidth={3}
              dot={false}
              isAnimationActive={false}
            />

            <Line 
              type="monotone" 
              dataKey="1.1.1.1" 
              name="Cloudflare DNS"
              stroke="#82ca9d" 
              strokeWidth={3}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}