import { 
  Geist, 
  Geist_Mono, 
  Kalam,
  Caveat,
  Indie_Flower,
  Permanent_Marker,
  Amatic_SC,
  Architects_Daughter,
  Coming_Soon,
  Shadows_Into_Light,
  Special_Elite,
  Courier_Prime,
  Bungee_Shade
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Sketch and handwriting fonts
const kalam = Kalam({
  variable: "--font-handwriting",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-decorative",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const indieFlower = Indie_Flower({
  variable: "--font-casual",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const permanentMarker = Permanent_Marker({
  variable: "--font-marker",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const amaticSC = Amatic_SC({
  variable: "--font-comic",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const architectsDaughter = Architects_Daughter({
  variable: "--font-sketch",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const comingSoon = Coming_Soon({
  variable: "--font-fun",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const shadowsIntoLight = Shadows_Into_Light({
  variable: "--font-shadow",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const specialElite = Special_Elite({
  variable: "--font-typewriter",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const courierPrime = Courier_Prime({
  variable: "--font-typewriter-alt",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const bungeeShade = Bungee_Shade({
  variable: "--font-graffiti",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata = {
  title: "Pranay Netha Guda",
  description: "Pranay Netha Guda Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${kalam.variable} ${caveat.variable} ${indieFlower.variable} ${permanentMarker.variable} ${amaticSC.variable} ${architectsDaughter.variable} ${comingSoon.variable} ${shadowsIntoLight.variable} ${specialElite.variable} ${courierPrime.variable} ${bungeeShade.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
