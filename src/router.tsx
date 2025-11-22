import { createBrowserRouter } from "react-router";

import Home, { action as homeAction } from "./routes/home";
import Layout from "./components/layout";

const routes = [
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
        action: homeAction,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export { router };
