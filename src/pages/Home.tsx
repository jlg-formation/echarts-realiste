import { Link } from "react-router";
import { Check, ArrowRight, BookOpen } from "lucide-react";

export default function Home() {
  return (
    <div className="flex h-full items-center justify-center bg-white">
      <div className="max-w-2xl px-8 text-center">
        {/* Tagline principale */}
        <h1 className="mt-8 mb-4 text-5xl font-semibold tracking-tight text-(--viridis-mid)">
          Visualisez vos données avec{" "}
          <span className="text-(--viridis-dark)">Apache ECharts</span>
        </h1>

        {/* Sous-titre */}
        <p className="mb-8 text-lg leading-relaxed text-[#333333]">
          Découvrez une collection d'exemples interactifs pour créer des
          graphiques époustouflants. Explorez, copiez et personnalisez le code
          pour vos projets.
        </p>

        {/* Features */}
        <div className="mb-10 flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-2 rounded-xl border border-[#e8e8e8] bg-white p-6 text-sm text-[#444444] shadow-md">
            <Check className="h-5 w-5 text-(--viridis-light)" />
            100+ exemples
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-[#e8e8e8] bg-white p-6 text-sm text-[#444444] shadow-md">
            <Check className="h-5 w-5 text-(--viridis-light)" />
            Code TypeScript
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-[#e8e8e8] bg-white p-6 text-sm text-[#444444] shadow-md">
            <Check className="h-5 w-5 text-(--viridis-light)" />
            Open Source
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/examples"
            className="inline-flex items-center gap-2 rounded-lg bg-(--viridis-light) px-4 py-2 text-lg font-semibold text-white shadow-sm transition-colors hover:bg-[#2a9d63]"
          >
            Explorer les exemples
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            to="/pedagogie"
            className="inline-flex items-center gap-2 rounded-lg border border-(--viridis-mid) px-4 py-2 text-lg font-semibold text-(--viridis-mid) transition-colors hover:bg-(--viridis-mid) hover:text-white"
          >
            <BookOpen className="h-5 w-5" />
            Pédagogie
          </Link>
        </div>

        {/* Footer note */}
        <p className="mt-8 text-base text-[#444444]">
          Basé sur{" "}
          <a
            href="https://echarts.apache.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-(--viridis-mid) no-underline transition-colors hover:text-(--viridis-light) hover:underline"
          >
            Apache ECharts
          </a>{" "}
          • Propulsé par React et TypeScript
        </p>
      </div>
    </div>
  );
}
