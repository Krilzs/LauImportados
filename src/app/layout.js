import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer/Footer";
import { Providers } from "@/store/Providers";
export const metadata = {
  title: "Lau Importados",
  description:
    "Home Page de Lau Importados, tienda de productos importados al mejor precio en Argentina.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
