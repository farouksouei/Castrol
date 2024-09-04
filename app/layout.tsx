import { GeistSans } from "geist/font/sans";
import "./globals.css";
import localFont from 'next/font/local'

const aspekta = localFont({
  src: [
    {
      path: '../public/Fieldwork11HumRegular.woff2',
      weight: '100',
    },
  ],
  variable: '--font-aspekta',
  display: 'swap',
})

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Castrol",
  description: "Castrol site",
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={aspekta.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
