import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Teste davinTI",
  description: "Teste para vaga full-stack empresa davinTI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="bg-gray-300">{children}</body>
    </html>
  );
}
