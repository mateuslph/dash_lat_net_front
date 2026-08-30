# Dash Lat Net Front

Dashboard web para monitoramento de conectividade e latência de hosts de rede.

A aplicação frontend foi desenvolvida com **React + TypeScript + Vite + Material UI**, consumindo uma API REST disponibilizada pelo backend Spring Boot.

O dashboard apresenta os resultados dos testes de ping realizados pelo servidor, permitindo acompanhar múltiplos hosts, latência, disponibilidade, taxa de sucesso e histórico de monitoramento.

---

## O fluxo de dados fica dessa maneira:

```text
Spring Boot
     │
     ▼
pingService.ts
     │
     ▼
usePingLogs.ts
     │
     ▼
Dashboard.tsx
     │
     ├────────► DashboardHeader
     ├────────► HostList
     ├────────► SummaryCards
     ├────────► LatencyChart
     ├────────► SuccessFailureChart
     ├────────► AverageLatencyChart
     ├────────► HostStatusTable
     └────────► PingHistoryTable
```

## Arquitetura está assim, cada camada possui uma responsabilidade clara:

```text
Dashboard.tsx
│
├── usePingLogs()
│       │
│       └── pingService.ts
│               │
│               └── Spring Boot
│                    /api/ping/logs
│
├── DashboardHeader
│
├── HostList
│
├── SummaryCards
│
├── LatencyChart
│       ├── google.com
│       ├── 8.8.8.8
│       ├── 1.1.1.1
│       └── 208.67.220.220
│
├── SuccessFailureChart
│
├── AverageLatencyChart
│
├── HostStatusTable
│
└── PingHistoryTable
```

---

## 📋 Funcionalidades

* Monitoramento de múltiplos hosts
* Atualização automática a cada 2 segundos
* Exibição do status ONLINE/OFFLINE
* Exibição da latência em milissegundos
* Histórico dos últimos 40 registros
* Taxa de sucesso dos testes
* Média de latência
* Gráfico de latência por host
* Uma cor diferente para cada host no gráfico
* Gráfico de sucesso x falha
* Gráfico de média de latência
* Tabela com o status atual de cada host
* Tabela com histórico dos pings
* Indicador de conexão com o backend
* Interface responsiva utilizando Material UI

---

## 🖥️ Tecnologias utilizadas

### Frontend

* React
* TypeScript
* Vite
* Material UI (MUI)
* Axios
* Chart.js
* react-chartjs-2

### Backend

O frontend foi desenvolvido para consumir um backend baseado em:

* Java 25
* Spring Boot
* Hibernate
* API REST

O backend é responsável pela execução dos testes de ping e armazenamento dos resultados.

---

## 🏗️ Arquitetura

A aplicação segue uma separação entre páginas, componentes, hooks, serviços, tipos e configurações.

```text
src/
├── components/
│   └── dashboard/
│       ├── DashboardHeader.tsx
│       ├── HostList.tsx
│       ├── SummaryCards.tsx
│       ├── LatencyChart.tsx
│       ├── SuccessFailureChart.tsx
│       ├── AverageLatencyChart.tsx
│       ├── HostStatusTable.tsx
│       └── PingHistoryTable.tsx
│
├── hooks/
│   └── usePingLogs.ts
│
├── services/
│   └── pingService.ts
│
├── types/
│   └── ping.ts
│
├── config/
│   └── api.ts
│
└── pages/
    └── Dashboard.tsx
```

### Responsabilidade de cada camada

#### `pages`

Contém as páginas da aplicação.

```text
pages/
└── Dashboard.tsx
```

O `Dashboard.tsx` é responsável principalmente por organizar os componentes e fornecer os dados necessários para cada um deles.

---

#### `components`

Contém os componentes visuais da aplicação.

```text
components/dashboard/
```

Cada componente possui uma responsabilidade específica.

| Componente            | Responsabilidade           |
| --------------------- | -------------------------- |
| `DashboardHeader`     | Título e status da conexão |
| `HostList`            | Lista de hosts monitorados |
| `SummaryCards`        | Indicadores gerais         |
| `LatencyChart`        | Gráfico de latência        |
| `SuccessFailureChart` | Gráfico de sucesso/falha   |
| `AverageLatencyChart` | Gráfico da média           |
| `HostStatusTable`     | Status atual dos hosts     |
| `PingHistoryTable`    | Histórico dos pings        |

---

#### `hooks`

Contém a lógica reutilizável relacionada ao React.

```text
hooks/
└── usePingLogs.ts
```

O `usePingLogs` é responsável por:

* buscar os logs;
* controlar o estado dos dados;
* controlar o carregamento;
* detectar erro no backend;
* atualizar automaticamente;
* executar o polling a cada 2 segundos.

---

#### `services`

Contém a comunicação com a API.

```text
services/
└── pingService.ts
```

O serviço utiliza Axios para acessar o backend.

---

#### `types`

Contém as interfaces TypeScript.

```text
types/
└── ping.ts
```

Isso evita duplicar a definição dos objetos utilizados pela aplicação.

---

#### `config`

Contém configurações da aplicação.

```text
config/
└── api.ts
```

Atualmente estão centralizados:

* endereço da API;
* quantidade máxima de registros;
* intervalo de atualização.

---

## 🔄 Comunicação com o backend

O frontend utiliza a API REST do Spring Boot.

### URL base

```text
http://localhost:8080/api/ping
```

### Buscar logs

```http
GET /api/ping/logs
```

O frontend consulta essa rota automaticamente a cada 2 segundos.

### Buscar hosts

O backend também disponibiliza:

```http
GET /api/ping/hosts
```

### Executar ping de um host

A API disponibiliza:

```http
GET /api/ping/{host}
```

Entretanto, o Dashboard atual utiliza principalmente `/logs`, pois os testes de ping já são executados pelo backend.

---

## 📦 Formato dos dados

O frontend espera receber registros no formato, exemplo com vários hosts:

```json
[
  {
    "host": "google.com",
    "reachable": true,
    "latency": 20
  },
  {
    "host": "8.8.8.8",
    "reachable": true,
    "latency": 20
  },
  {
    "host": "1.1.1.1",
    "reachable": true,
    "latency": 21
  },
  {
    "host": "208.67.220.220",
    "reachable": true,
    "latency": 29
  }
]
```

A interface identifica automaticamente os hosts existentes nos dados recebidos.

---

## 🌐 Hosts monitorados

Os hosts não ficam fixos no frontend.

Por exemplo, se o backend estiver monitorando:

```text
google.com
8.8.8.8
1.1.1.1
208.67.220.220
```

o frontend identifica automaticamente esses hosts a partir dos registros recebidos.

Isso permite adicionar novos hosts no backend sem precisar alterar o `Dashboard.tsx`.

---

## 📊 Gráfico de latência

O gráfico **Latência ao longo do tempo** utiliza uma série independente para cada host.

Exemplo:

```text
google.com       ─────────────
8.8.8.8          ─────────────
1.1.1.1          ─────────────
208.67.220.220   ─────────────
```

Cada host recebe uma cor própria para facilitar a identificação.

A legenda do gráfico apresenta o nome de cada host.

---

## ⏱️ Atualização automática

O Dashboard realiza uma primeira consulta imediatamente após ser carregado.

Depois disso, os dados são atualizados automaticamente a cada:

```text
2 segundos
```

Essa configuração está centralizada em:

```text
src/config/api.ts
```

Atualmente:

```ts
export const UPDATE_INTERVAL = 2000;
```

Para alterar para 5 segundos:

```ts
export const UPDATE_INTERVAL = 5000;
```

Para 10 segundos:

```ts
export const UPDATE_INTERVAL = 10000;
```

---

## 📚 Limite do histórico

O frontend mantém os últimos:

```text
40 registros
```

Essa configuração também está em:

```text
src/config/api.ts
```

```ts
export const MAX_LOGS = 40;
```

Pode ser alterada conforme a necessidade.

Por exemplo:

```ts
export const MAX_LOGS = 100;
```

---

## 🚀 Instalação

### 1. Clonar o projeto

```bash
git clone <URL_DO_REPOSITORIO>
```

Entrar no diretório:

```bash
cd dash_lat_net_front
```

---

### 2. Instalar dependências

```bash
npm install
```

---

### 3. Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

Normalmente o Vite disponibilizará a aplicação em:

```text
http://localhost:5173
```

---

## 🔧 Configuração do backend

O backend Spring Boot deve estar executando na porta:

```text
8080
```

O frontend está configurado para utilizar:

```ts
export const API_URL =
  "http://localhost:8080/api/ping";
```

Portanto, o backend deve disponibilizar:

```text
http://localhost:8080/api/ping/logs
```

---

## ⚠️ CORS

O backend deve permitir requisições provenientes do frontend.

No Spring Boot, o Controller pode utilizar:

```java
@CrossOrigin(origins = "http://localhost:5173")
```

Exemplo:

```java
@RestController
@RequestMapping("/api/ping")
@CrossOrigin(origins = "http://localhost:5173")
public class PingController {

    // ...

}
```

---

## 🛠️ Scripts

Os comandos disponíveis dependem do `package.json`.

Normalmente:

```bash
npm run dev
```

Executa o ambiente de desenvolvimento.

```bash
npm run build
```

Gera a versão de produção.

```bash
npm run preview
```

Executa uma prévia da versão de produção.

```bash
npm run lint
```

Executa a análise estática do código, caso o ESLint esteja configurado.

---

## 📁 Estrutura recomendada do projeto

Uma estrutura completa pode ficar:

```text
dash_lat_net_front/
│
├── public/
│
├── src/
│   │
│   ├── components/
│   │   └── dashboard/
│   │       ├── DashboardHeader.tsx
│   │       ├── HostList.tsx
│   │       ├── SummaryCards.tsx
│   │       ├── LatencyChart.tsx
│   │       ├── SuccessFailureChart.tsx
│   │       ├── AverageLatencyChart.tsx
│   │       ├── HostStatusTable.tsx
│   │       └── PingHistoryTable.tsx
│   │
│   ├── hooks/
│   │   └── usePingLogs.ts
│   │
│   ├── services/
│   │   └── pingService.ts
│   │
│   ├── types/
│   │   └── ping.ts
│   │
│   ├── config/
│   │   └── api.ts
│   │
│   ├── pages/
│   │   └── Dashboard.tsx
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🔐 Variáveis de ambiente

Para desenvolvimento local, a URL da API atualmente está definida em:

```text
src/config/api.ts
```

Para ambientes diferentes, é recomendado futuramente utilizar variáveis de ambiente do Vite:

```text
.env
.env.development
.env.production
```

Por exemplo:

```env
VITE_API_URL=http://localhost:8080/api/ping
```

E no código:

```ts
export const API_URL =
  import.meta.env.VITE_API_URL;
```

Isso permite utilizar diferentes servidores sem modificar o código-fonte.

---

## 🏭 Build para produção

Para gerar a aplicação:

```bash
npm run build
```

Os arquivos serão gerados normalmente em:

```text
dist/
```

Esses arquivos podem ser publicados em um servidor web, como Nginx, Apache ou outro serviço de hospedagem.

---

## 🐛 Problemas comuns

### Backend não conecta

Se aparecer:

```text
BACKEND OFFLINE
```

verifique se o Spring Boot está executando:

```text
http://localhost:8080
```

E teste:

```text
http://localhost:8080/api/ping/logs
```

---

### Erro de CORS

Se o navegador informar erro de CORS, verifique se o backend permite:

```text
http://localhost:5173
```

---

### Nenhum host aparece

Verifique se:

```text
/api/ping/logs
```

está retornando um array de objetos contendo:

```json
{
  "host": "...",
  "reachable": true,
  "latency": 20
}
```

## 📌 Status atual do projeto

**Em desenvolvimento.**

O projeto atualmente possui:

* monitoramento de múltiplos hosts;
* atualização automática;
* visualização de latência;
* indicadores de disponibilidade;
* gráficos;
* histórico;
* arquitetura React separada em componentes;
* comunicação com backend Spring Boot.

---

## 👨‍💻 Desenvolvimento

Projeto **Dash Lat Net**.

Frontend desenvolvido com:

```text
React
TypeScript
Vite
Material UI
Axios
Chart.js
```

Backend:

```text
Java 25
Spring Boot
Hibernate
```
