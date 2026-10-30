import { createFileRoute } from "@tanstack/react-router";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { HubDashboard } from "@/components/hub/hub-dashboard";

export const Route = createFileRoute("/hub")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Kenneth Remmitz Hub" },
      { name: "description", content: "Private command center for Kenneth Remmitz." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Kenneth Remmitz Hub" },
      {
        property: "og:description",
        content: "Private command center for Kenneth Remmitz.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: HubRoute,
});

function HubRoute() {
  return (
    <ProtectedRoute>
      <HubDashboard />
    </ProtectedRoute>
  );
}
