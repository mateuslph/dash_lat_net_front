import { useMemo } from "react";
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
  // Os hosts que queremos monitorar
  const hosts = ["8.8.8.8", "1.1.1.1"];
  
  // Consumindo o nosso Hook customizado
  const rawData = usePing(hosts);

  // Transformando os dados para o formato que o Recharts entende
  // Ele agrupa as latências do Google e Cloudflare que ocorreram no mesmo segundo
  const chartData = useMemo(() => {
    const grouped = rawData.reduce((acc: any, current) => {
      // Se deu timeout (-1), deixamos como null para a linha quebrar no gráfico (fica visualmente claro que caiu)
      const latencyValue = current.latency === -1 ? null : current.latency;

      if (!acc[current.time]) {
        acc[current.time] = { time: current.time };
      }
      
      acc[current.time][current.host] = latencyValue;
      return acc;
    }, {});

    return Object.values(grouped);
  }, [rawData]);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", backgroundColor: "#f4f4f9", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", color: "#333", marginBottom: "2rem" }}>
        🌐 Monitoramento de Latência
      </h1>

      {/* Container do Gráfico */}
      <div style={{ 
        width: "100%", 
        height: 450, 
        backgroundColor: "#fff", 
        padding: "1.5rem", 
        borderRadius: "12px", 
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)" 
      }}>
        
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            {/* Grade de fundo */}
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            
            {/* Eixos */}
            <XAxis dataKey="time" tick={{ fontSize: 12 }} />
            <YAxis 
              label={{ value: 'Latência (ms)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }} 
              tick={{ fontSize: 12 }}
            />
            
            {/* Tooltip ao passar o mouse */}
            <Tooltip 
              contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
            />
            <Legend verticalAlign="top" height={36} />

            {/* Linha do Google */}
            <Line 
              type="monotone" 
              dataKey="8.8.8.8" 
              name="Google DNS"
              stroke="#8884d8" 
              strokeWidth={3}
              dot={false} // Tira as bolinhas para o gráfico ficar mais limpo
              isAnimationActive={false} // Desativa a animação inicial para não "piscar" a cada 2 segundos
            />

            {/* Linha da Cloudflare */}
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