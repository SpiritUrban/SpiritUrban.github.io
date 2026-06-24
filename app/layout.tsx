import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Віталій Дячук | Fullstack Developer & Mentor",
  description:
    "20 років у вебі. Від дизайну і 3D до Next.js, SEO-систем, веб-сервісів і технічного наставництва.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}