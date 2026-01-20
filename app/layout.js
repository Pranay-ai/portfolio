import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata = {
  title: "Pranay Netha Guda | Full-Stack Software Engineer",
  description:
    "Full-Stack Software Engineer specializing in AI Voice Agent platforms, real-time telephony (Pipecat, Daily.co, Twilio), LLM orchestration, and Graph RAG systems.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${cormorant.variable}`}>
      <body className={cormorant.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
