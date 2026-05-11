import { Inter, Playfair_Display } from "next/font/google";

export const fontPrincipal = Inter({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontSecondary = Playfair_Display({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
});
