export default function Legal() {
  return (
    <div className="h-full overflow-auto p-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-800">
          Mentions légales
        </h1>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-gray-700">Éditeur</h2>
          <p className="text-gray-600">
            Ce site est édité par{" "}
            <a
              href="https://github.com/jlg-formation"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#21918c] hover:underline"
            >
              jlg-formation
            </a>
            .
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-gray-700">
            Hébergement
          </h2>
          <p className="text-gray-600">
            Ce site est hébergé par{" "}
            <a
              href="https://pages.github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#21918c] hover:underline"
            >
              GitHub Pages
            </a>
            .
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-gray-700">Licence</h2>
          <p className="mb-4 text-gray-600">
            Ce projet est distribué sous licence{" "}
            <a
              href="https://www.apache.org/licenses/LICENSE-2.0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#21918c] hover:underline"
            >
              Apache License 2.0
            </a>
            .
          </p>
          <p className="text-gray-600">
            Le code source est disponible sur{" "}
            <a
              href="https://github.com/jlg-formation/echarts-realiste"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#21918c] hover:underline"
            >
              GitHub
            </a>
            .
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-gray-700">
            Technologies utilisées
          </h2>
          <ul className="list-inside list-disc space-y-2 text-gray-600">
            <li>
              <a
                href="https://echarts.apache.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#21918c] hover:underline"
              >
                Apache ECharts
              </a>{" "}
              — Bibliothèque de visualisation de données
            </li>
            <li>
              <a
                href="https://react.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#21918c] hover:underline"
              >
                React
              </a>{" "}
              — Framework JavaScript
            </li>
            <li>
              <a
                href="https://tailwindcss.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#21918c] hover:underline"
              >
                Tailwind CSS
              </a>{" "}
              — Framework CSS
            </li>
            <li>
              <a
                href="https://vite.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#21918c] hover:underline"
              >
                Vite
              </a>{" "}
              — Outil de build
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-gray-700">
            Données personnelles
          </h2>
          <p className="text-gray-600">
            Ce site ne collecte aucune donnée personnelle et n'utilise pas de
            cookies.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-gray-700">Contact</h2>
          <p className="text-gray-600">
            Pour toute question, veuillez ouvrir une issue sur le{" "}
            <a
              href="https://github.com/jlg-formation/echarts-realiste/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#21918c] hover:underline"
            >
              dépôt GitHub
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
