import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Get-Me-A-Chai=>Fund Your Project With Chai",
  description: "A website made for crowdfunding platform for creators",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
     
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <SessionWrapper>
        <Navbar />
        <div className="text-white min-h-[75.3vh] bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
          {children}
        </div>
        <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
