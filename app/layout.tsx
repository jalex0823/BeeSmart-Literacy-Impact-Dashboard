import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BeeSmart Literacy Impact Dashboard",
  description:
    "Data-driven literacy impact modeling for schools, districts, grant reviewers, and sponsors. Powered by TEA TAPR, STAAR, and HISD data.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-[#0f172a] text-slate-100">
        {children}
      </body>
    </html>
  );
}
