import { Link } from "react-router";

export default function Home() {
  return (
    <div className="flex h-full items-center justify-center bg-white">
      <div className="max-w-2xl px-8 text-center">
        {/* Tagline principale */}
        <h1 className="mt-8 mb-4 text-5xl font-semibold tracking-tight text-[var(--viridis-mid)]">
          Visualisez vos données avec{" "}
          <span className="text-[var(--viridis-dark)]">Apache ECharts</span>
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
            <svg
              className="h-5 w-5 text-[var(--viridis-light)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            100+ exemples
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-[#e8e8e8] bg-white p-6 text-sm text-[#444444] shadow-md">
            <svg
              className="h-5 w-5 text-[var(--viridis-light)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Code TypeScript
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-[#e8e8e8] bg-white p-6 text-sm text-[#444444] shadow-md">
            <svg
              className="h-5 w-5 text-[var(--viridis-light)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Open Source
          </div>
        </div>

        {/* CTA Button */}
        <Link
          to="/examples"
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--viridis-light)] px-4 py-2 text-lg font-semibold text-white shadow-sm transition-colors hover:bg-[#2a9d63]"
        >
          Explorer les exemples
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>

        {/* Footer note */}
        <p className="mt-8 text-base text-[#444444]">
          Basé sur{" "}
          <a
            href="https://echarts.apache.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--viridis-mid)] no-underline transition-colors hover:text-[var(--viridis-light)] hover:underline"
          >
            Apache ECharts
          </a>{" "}
          • Propulsé par React et TypeScript
        </p>
      </div>
    </div>
  );
}
