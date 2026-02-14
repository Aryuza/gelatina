import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gelatina Fit - Tu Plan Personalizado para Bajar de Peso",
  description:
    "Descubrí cómo la Gelatina Fit puede ayudarte a alcanzar tu peso ideal. Hacé el quiz gratuito y recibí tu plan personalizado.",
  openGraph: {
    title: "Gelatina Fit - Tu Plan Personalizado para Bajar de Peso",
    description:
      "Descubrí cómo la Gelatina Fit puede ayudarte a alcanzar tu peso ideal.",
    type: "website",
    locale: "es_AR",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#ec4899",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
