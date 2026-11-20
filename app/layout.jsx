import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import Header from "@/components/Header";
import { AuthProvider } from "@/components/AuthProvider";
import Footer from "@/components/Footer";

export const metadata = {
  title: "TechNova | Tecnologia acessível e prática para o seu dia a dia",
  description: "Loja virtual de acessórios de tecnologia: fones, teclados, mouses, carregadores e mais. Projeto acadêmico.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>
          <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
