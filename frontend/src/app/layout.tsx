import type { Metadata } from "next";
import { DM_Sans } from 'next/font/google';
import './styles/globals.css';

const dmSans = DM_Sans({ 
  weight: ['400', '500', '700'],
  subsets: ['latin'] 
});

export const metadata: Metadata = {
  title: "ArtUteq",
  description: "Health Guardian sistema de predicción de casos de COVID-19",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={dmSans.className}>
        {children}
      </body>
    </html>
  );
}