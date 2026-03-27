import { useEffect, useState } from "react";

type PingData = {
  host: string;
  latency: number;
  time: string;
};

export function usePing(hosts: string[]) {
  const [data, setData] = useState<PingData[]>([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      for (const host of hosts) {
        try {
          // Chamando o backend Spring Boot na porta 8080
          const response = await fetch(`http://localhost:8080/api/ping/${host}`);
          
          if (!response.ok) {
            throw new Error("Erro na requisição");
          }

          const result = await response.json();

          const item: PingData = {
            host,
            latency: result.latency ?? -1,
            time: new Date().toLocaleTimeString(),
          };

          // Atualiza o estado mantendo apenas os últimos 40 registros
          setData((prev) => {
            const newData = [...prev, item];
            return newData.slice(-40); 
          });

        } catch (error) {
          console.error(`Erro ao buscar ping de ${host}:`, error);
          
          // Caso dê erro (ex: backend caiu), registra como timeout (-1) e também limita a 40 itens
          setData((prev) => {
            const newData = [
              ...prev,
              {
                host,
                latency: -1,
                time: new Date().toLocaleTimeString(),
              },
            ];
            return newData.slice(-40);
          });
        }
      }
    }, 2000); // Roda a cada 2 segundos

    return () => clearInterval(interval); // Limpeza do intervalo ao desmontar o componente
  }, [hosts]);

  return data;
}