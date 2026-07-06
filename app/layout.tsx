import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import ApolloClientProvider from "@/components/providers/ApolloClientProvider";
import ServiceWorkerRegistration from "@/components/providers/ServiceWorkerRegistration";

import "./globals.css";

export const metadata: Metadata = {
  title: "Kanban Board",
  description: "A Kanban board built with Next.js.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#35A839",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
        />
      </head>
      <body>
        <ApolloClientProvider>{children}</ApolloClientProvider>
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
