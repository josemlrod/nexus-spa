import { createBrowserRouter } from "react-router";

import Home, { action as homeAction } from "./routes/home";

const routes = [
  {
    path: "/",
    element: <Home />,
    action: homeAction,
  },
];

const router = createBrowserRouter(routes);

export { router };
