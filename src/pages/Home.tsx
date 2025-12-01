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
            className="inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-[#440154] via-[#31688E] to-[#35B779] px-4 py-2 text-lg font-semibold text-white shadow-sm transition-all hover:brightness-110"
          >
            Explorer les exemples
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            to="/pedagogie"
            className="inline-flex items-center gap-2 rounded-lg border border-(--viridis-mid) bg-linear-to-r from-[#440154] via-[#31688E] to-[#35B779] bg-clip-text px-4 py-2 text-lg font-semibold text-transparent transition-all hover:opacity-80"
          >
            <BookOpen className="h-5 w-5 text-(--viridis-mid)" />
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
