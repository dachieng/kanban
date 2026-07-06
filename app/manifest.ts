import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kanban Board",
    short_name: "Kanban",
    description: "A Kanban board built with Next.js.",
    start_url: "/",
    display: "standalone",
    background_color: "#D5D7DA",
    theme_color: "#35A839",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
