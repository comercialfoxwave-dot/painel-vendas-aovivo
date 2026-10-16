import { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Vendas de hoje ao vivo - Mercado Livre",
  description: "Tendências em vendas brutas em tempo real",
  icons: {
    icon: "/meli-favicon.png",
    shortcut: "/meli-favicon.png",
    apple: "/meli-favicon.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/meli-favicon.png" type="image/png" sizes="any" />
      </head>
      <body className="min-h-screen bg-[#F5F5F7] text-[#333] font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
