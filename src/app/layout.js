import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import RouteDirector from "@/components/RouteDirector/RouteDirector";
import Footer from "@/components/Footer/Footer";
import Providers from "@/utils/Frontend/store/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "dollar hut",
  description: "Exchange your currency",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <RouteDirector />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
