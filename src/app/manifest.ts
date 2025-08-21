import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Admin TAUD Salsabila",
    short_name: "TAUD Salsabila",
    description:
      "Aplikasi administrasi sekolah TAUD Salsabila - Progressive Web App",
    start_url: "/",
    id: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#FFD700",
    theme_color: "#FFD700",
    categories: ["education", "productivity"],
    lang: "id",
    scope: "/",
    icons: [
      {
        src: "/icons/icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-96x96.png",
        sizes: "96x96",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-128x128.png",
        sizes: "128x128",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-256x256.png",
        sizes: "256x256",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    screenshots: [
      {
        src: "/screenshots/desktop-screenshot.png",
        sizes: "1920x1080",
        type: "image/png",
        form_factor: "wide",
        label: "Desktop view of Admin TAUD Salsabila",
      },
      {
        src: "/screenshots/mobile-screenshot.png",
        sizes: "390x651",
        type: "image/png",
        form_factor: "narrow",
        label: "Mobile view of Admin TAUD Salsabila",
      },
    ],
    shortcuts: [
      {
        name: "Dashboard",
        short_name: "Dashboard",
        description: "Akses langsung ke dashboard admin",
        url: "/dashboard",
        icons: [
          {
            src: "/icons/icon-96x96.png",
            sizes: "96x96",
            type: "image/png",
          },
        ],
      },
    ],
    display_override: ["window-controls-overlay", "standalone"],
    prefer_related_applications: false,
  };
}
