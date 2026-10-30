import { ReactNode } from "react";

export const metadata = {
  title: "ApplyFy - crie, venda e escale",
  description: "Painel de gestão e vendas Applyfy",
  icons: {
    icon: "/painel/favicon.png",
    shortcut: "/painel/favicon.png",
    apple: "/painel/favicon.png",
  },
};

export default function ApplyfyLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans antialiased selection:bg-[#FFC247]/30 selection:text-white">
      {children}
    </div>
  );
}
