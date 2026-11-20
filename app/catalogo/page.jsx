import { Suspense } from "react";
import CatalogoClient from "@/components/CatalogoClient";

export const metadata = { title: "Catálogo | TechNova" };

export default function Catalogo() {
  return (
    <Suspense fallback={<p className="p-10 text-center">Carregando catálogo...</p>}>
      <CatalogoClient />
    </Suspense>
  );
}
