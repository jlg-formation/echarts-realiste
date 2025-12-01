import { Link } from "react-router";

interface PedagogyCardProps {
  title: string;
  description: string;
  dontLink?: string;
  doLink?: string;
}

export default function PedagogyCard({
  title,
  description,
  dontLink,
  doLink,
}: PedagogyCardProps) {
  return (
    <div className="rounded-xl border border-[#e8e8e8] bg-white p-6 shadow-md">
      {/* Titre et description */}
      <h3 className="mb-2 text-lg font-semibold text-(--viridis-dark)">
        {title}
      </h3>
      <p className="mb-4 text-sm leading-relaxed text-[#444444]">
        {description}
      </p>

      {/* Comparaison Don't / Do */}
      <div className="flex gap-4">
        {/* Don't */}
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-100">
              <svg
                className="h-3 w-3 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
            <span className="text-sm font-medium text-red-600">Don&apos;t</span>
          </div>
          {dontLink ? (
            <Link
              to={dontLink}
              className="group flex h-32 items-center justify-center overflow-hidden rounded-lg border-2 border-red-200 bg-gradient-to-br from-red-50 to-red-100 transition-all hover:border-red-400 hover:shadow-md"
            >
              <div className="flex flex-col items-center gap-2 text-red-400 transition-colors group-hover:text-red-600">
                <svg
                  className="h-10 w-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <span className="text-xs font-medium">Voir l&apos;exemple</span>
              </div>
            </Link>
          ) : (
            <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-red-200 bg-red-50">
              <span className="text-sm text-red-300">À venir</span>
            </div>
          )}
        </div>

        {/* Do */}
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-3 w-3 text-green-500"
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
            </span>
            <span className="text-sm font-medium text-green-600">Do</span>
          </div>
          {doLink ? (
            <Link
              to={doLink}
              className="group flex h-32 items-center justify-center overflow-hidden rounded-lg border-2 border-green-200 bg-gradient-to-br from-green-50 to-green-100 transition-all hover:border-green-400 hover:shadow-md"
            >
              <div className="flex flex-col items-center gap-2 text-green-400 transition-colors group-hover:text-green-600">
                <svg
                  className="h-10 w-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <span className="text-xs font-medium">Voir l&apos;exemple</span>
              </div>
            </Link>
          ) : (
            <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-green-200 bg-green-50">
              <span className="text-sm text-green-300">À venir</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
