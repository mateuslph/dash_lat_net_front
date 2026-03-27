import { useRoutes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";

export default function Routes() {
  return useRoutes([
    {
      path: "/",
      element: <Dashboard />,
    },
  ]);
}