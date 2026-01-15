import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
    title: "VehicleHub - Rent & Manage Vehicles",
    description: "A professional vehicle listing and booking platform.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}
