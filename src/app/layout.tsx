import "./globals.css";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AnnouncementBar } from "@/components/announcement-bar";
import { CartProvider } from "@/lib/cart";
import { AffiliateProvider } from "@/lib/affiliate";

export const metadata: Metadata = {
  title: "AXIOM Peptides — Axiom Biology",
  description: "High-Purity Research Peptides. Lab-Tested. Precision Formulated. Research use only.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AffiliateProvider>
          <CartProvider>
            <AnnouncementBar />
            <SiteHeader />
            <main className="min-h-[70vh]">{children}</main>
            <SiteFooter />
          </CartProvider>
        </AffiliateProvider>
      </body>
    </html>
  );
}
