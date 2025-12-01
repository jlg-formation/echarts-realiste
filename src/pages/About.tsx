export default function About() {
  return (
    <div className="h-full overflow-auto p-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-800">À propos</h1>

        <section className="mb-8">
          <p className="mb-4 text-gray-600">
            <strong>echarts-réaliste</strong> est un site pédagogique qui
            s'inspire de la{" "}
            <a
              href="https://echarts.apache.org/examples/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#21918c] hover:underline"
            >
              documentation officielle d'Apache ECharts
            </a>{" "}
            pour proposer des exemples de visualisation de données plus
            réalistes.
          </p>
          <p className="mb-4 text-gray-600">
            L'objectif est de montrer comment utiliser{" "}
            <a
              href="https://echarts.apache.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#21918c] hover:underline"
            >
              Apache ECharts
            </a>{" "}
            avec des données concrètes et contextualisées, afin de faciliter
            l'apprentissage et la compréhension de cette puissante bibliothèque
            de visualisation.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-gray-700">
            Liens utiles
          </h2>
          <ul className="list-inside list-disc space-y-2 text-gray-600">
            <li>
              <a
                href="https://echarts.apache.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#21918c] hover:underline"
              >
                Site officiel Apache ECharts
              </a>
            </li>
            <li>
              <a
                href="https://echarts.apache.org/examples/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#21918c] hover:underline"
              >
                Galerie d'exemples Apache ECharts
              </a>
            </li>
            <li>
              <a
                href="https://echarts.apache.org/handbook/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#21918c] hover:underline"
              >
                Manuel Apache ECharts
              </a>
            </li>
            <li>
              <a
                href="https://github.com/jlg-formation/echarts-realiste"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#21918c] hover:underline"
              >
                Code source de ce projet
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
