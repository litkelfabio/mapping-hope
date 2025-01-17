import type { Metadata } from "next";
import "./globals.css";
import { inter } from "./ui/fonts";


export const metadata: Metadata = {
  title: "Mapping Hope",
  description: "Lorem ipsum dolor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}
        <script>window.global ||= window</script>
      </body>
    </html>
  );
}
