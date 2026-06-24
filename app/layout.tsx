import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body>
        <LanguageSwitcher />
        {children}
      </body>
    </html>
  );
}