interface PedagogyCardProps {
  title: string;
  description: string;
  dontThumbnail: string;
  doThumbnail: string;
  dontLink?: string;
  doLink?: string;
}

export default function PedagogyCard({
  title,
  description,
  dontThumbnail,
  doThumbnail,
  dontLink,
  doLink,
}: PedagogyCardProps) {
  return (
    <div className="rounded-xl border border-[#e8e8e8] bg-white p-6 shadow-md">
      {/* Titre et description */}
      <h3 className="mb-2 text-lg font-semibold text-[var(--viridis-dark)]">
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
            <a
              href={dontLink}
              className="block overflow-hidden rounded-lg border border-red-200 transition-transform hover:scale-[1.02]"
            >
              <img
                src={dontThumbnail}
                alt="Mauvaise pratique"
                className="h-32 w-full object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://via.placeholder.com/200x128?text=Don%27t";
                }}
              />
            </a>
          ) : (
            <div className="overflow-hidden rounded-lg border border-red-200">
              <img
                src={dontThumbnail}
                alt="Mauvaise pratique"
                className="h-32 w-full object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://via.placeholder.com/200x128?text=Don%27t";
                }}
              />
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
            <a
              href={doLink}
              className="block overflow-hidden rounded-lg border border-green-200 transition-transform hover:scale-[1.02]"
            >
              <img
                src={doThumbnail}
                alt="Bonne pratique"
                className="h-32 w-full object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://via.placeholder.com/200x128?text=Do";
                }}
              />
            </a>
          ) : (
            <div className="overflow-hidden rounded-lg border border-green-200">
              <img
                src={doThumbnail}
                alt="Bonne pratique"
                className="h-32 w-full object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://via.placeholder.com/200x128?text=Do";
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
