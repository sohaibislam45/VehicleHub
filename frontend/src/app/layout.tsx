import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: '--font-space-grotesk',
    display: 'swap',
});

export const metadata: Metadata = {
    title: "VehicleHub | Premium Mobility",
    description: "Experience ultra-premium vehicle rentals curated for the modern explorer.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <head>
                <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
            </head>
            <body className={`${spaceGrotesk.variable} ${spaceGrotesk.className} antialiased`}>
                <AuthProvider>
                    <Navbar />
                    <main className="min-h-screen bg-[#121416] font-sans">{children}</main>
                    <Footer />
                </AuthProvider>
            </body>
        </html>
    );
}
