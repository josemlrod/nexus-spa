import { ConvexProvider, ConvexReactClient } from "convex/react";
import { RouterProvider } from "react-router";

import { router } from "@/router";

export const convex = new ConvexReactClient(
  import.meta.env.VITE_CONVEX_URL as string,
);

export function AppWithProviders() {
  return (
    <ConvexProvider client={convex}>
      <RouterProvider router={router} />
    </ConvexProvider>
  );
}
