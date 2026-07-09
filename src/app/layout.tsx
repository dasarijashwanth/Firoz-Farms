import type { Metadata } from "next";
import { Playfair_Display, Inter, Poppins } from "next/font/google";
import { Toaster } from "sonner";
import { CartProvider } from "@/components/shop/CartProvider";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Firoz Farms | Pure Farm Fresh Goodness Delivered Every Morning",
    template: "%s | Firoz Farms",
  },
  description:
    "Farm-fresh organic milk, dairy, and groceries delivered daily from Firoz Farms in Mahaboobnagar Village, Khammam District, Telangana. Healthy cows, healthy farms, healthy families.",
  keywords: [
    "organic dairy Telangana",
    "farm fresh milk delivery",
    "A2 milk Khammam",
    "organic groceries Telangana",
    "Firoz Farms",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>{children}</CartProvider>
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
