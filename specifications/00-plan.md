# Plan de Réalisation - Exemples ECharts Réalistes

## Progression

- ✅ Traités : 5 / 174
- 🔲 Restants : 169

## Comment traiter un ou plusieurs diagrammes

Pour traiter des diagrammes, utilise le prompt **avance.prompt.md** avec le paramètre `count` :

```
@avance.prompt.md count=<nombre>
```

### Paramètre `count`

Le paramètre `count` (valeur par défaut : **1**) spécifie le **nombre de diagrammes consécutifs à traiter** en partant du premier diagramme "🔲 À faire" dans le tableau.

- `count=1` : traite uniquement le prochain diagramme à faire
- `count=3` : traite les 3 prochains diagrammes à faire
- `count=5` : traite les 5 prochains diagrammes à faire

**Exemples :**

- `@avance.prompt.md` → traite le prochain diagramme à faire
- `@avance.prompt.md count=3` → traite les 3 prochains diagrammes à faire

---

## Tableau de suivi

### Line

| Catégorie | Titre                                 | Statut     | Sujet métier suggéré                          |
| --------- | ------------------------------------- | ---------- | --------------------------------------------- |
| Line      | Basic Line Chart                      | ✅ Fait    | Température mensuelle                         |
| Line      | Smoothed Line Chart                   | ✅ Fait    | Cours de bourse                               |
| Line      | Basic area chart                      | ✅ Fait    | Consommation électrique résidentielle         |
| Line      | Stacked Line Chart                    | ✅ Fait    | Répartition du trafic web par source          |
| Line      | Stacked Area Chart                    | ✅ Fait    | Consommation énergétique par secteur          |
| Line      | Gradient Stacked Area Chart           | 🔲 À faire | Évolution des ventes e-commerce par canal     |
| Line      | Bump Chart (Ranking)                  | 🔲 À faire | Classement équipes de football sur une saison |
| Line      | Temperature Change in the Coming Week | 🔲 À faire | Prévisions météo hebdomadaires multi-villes   |
| Line      | Area Pieces                           | 🔲 À faire | Niveau de stock critique vs normal            |
| Line      | Data Transform Filter                 | 🔲 À faire | Filtrage patients par groupe sanguin          |
| Line      | Line Gradient                         | 🔲 À faire | Altitude d'un vol commercial                  |
| Line      | Line with Sections                    | 🔲 À faire | Phases de production industrielle             |

### Bar

| Catégorie | Titre                               | Statut     | Sujet métier suggéré                            |
| --------- | ----------------------------------- | ---------- | ----------------------------------------------- |
| Bar       | Basic Bar                           | 🔲 À faire | Ventes mensuelles par région                    |
| Bar       | Axis Align with Tick                | 🔲 À faire | Heures de travail par jour de la semaine        |
| Bar       | Bar with Background                 | 🔲 À faire | Taux d'occupation hôtelière                     |
| Bar       | Set Style of Single Bar             | 🔲 À faire | Performance commerciaux (meilleur mis en avant) |
| Bar       | Waterfall Chart                     | 🔲 À faire | Analyse de trésorerie mensuelle                 |
| Bar       | Bar Chart with Negative Value       | 🔲 À faire | Balance commerciale import/export               |
| Bar       | Radial Polar Bar Label Position     | 🔲 À faire | Répartition budget marketing par canal          |
| Bar       | Tangential Polar Bar Label Position | 🔲 À faire | Compétences radar d'un développeur              |
| Bar       | World Population                    | 🔲 À faire | Top 10 pays par PIB                             |
| Bar       | Bar Label Rotation                  | 🔲 À faire | Nombre de commits par développeur               |

### Pie

| Catégorie | Titre                              | Statut     | Sujet métier suggéré                      |
| --------- | ---------------------------------- | ---------- | ----------------------------------------- |
| Pie       | Referer of a Website               | 🔲 À faire | Sources de trafic d'un site e-commerce    |
| Pie       | Doughnut Chart with Rounded Corner | 🔲 À faire | Répartition des dépenses ménage           |
| Pie       | Doughnut Chart                     | 🔲 À faire | Parts de marché navigateurs web           |
| Pie       | Half Doughnut Chart                | 🔲 À faire | Jauge de satisfaction client NPS          |
| Pie       | Pie with padAngle                  | 🔲 À faire | Répartition temps de travail par projet   |
| Pie       | Customized Pie                     | 🔲 À faire | Mix énergétique d'un pays                 |
| Pie       | Texture on Pie Chart               | 🔲 À faire | Types de cultures agricoles               |
| Pie       | Nightingale Chart                  | 🔲 À faire | Répartition sinistres assurance par type  |
| Pie       | Nightingale Chart Simple           | 🔲 À faire | Ventes par catégorie de produits          |
| Pie       | Nested Pies                        | 🔲 À faire | Budget entreprise (départements + postes) |

### Scatter

| Catégorie | Titre                  | Statut     | Sujet métier suggéré                         |
| --------- | ---------------------- | ---------- | -------------------------------------------- |
| Scatter   | Basic Scatter Chart    | 🔲 À faire | Corrélation prix immobilier vs surface       |
| Scatter   | Anscombe's quartet     | 🔲 À faire | Données statistiques pédagogiques            |
| Scatter   | Clustering Process     | 🔲 À faire | Segmentation clients e-commerce              |
| Scatter   | Exponential Regression | 🔲 À faire | Croissance virale d'une application          |
| Scatter   | Effect Scatter Chart   | 🔲 À faire | Épidémie - foyers actifs sur une carte       |
| Scatter   | Linear Regression      | 🔲 À faire | Corrélation heures d'étude vs notes          |
| Scatter   | Polynomial Regression  | 🔲 À faire | Courbe de consommation carburant vs vitesse  |
| Scatter   | Scatter with Jittering | 🔲 À faire | Répartition salaires par niveau d'expérience |

### GEO/Map

| Catégorie | Titre                      | Statut     | Sujet métier suggéré                       |
| --------- | -------------------------- | ---------- | ------------------------------------------ |
| Map       | Geo Graph                  | 🔲 À faire | Réseau de transport ferroviaire            |
| Map       | Geo Choropleth and Scatter | 🔲 À faire | Densité population + villes principales    |
| Map       | Pie Charts on GEO Map      | 🔲 À faire | Répartition production agricole par région |
| Map       | GEO Beef Cuts              | 🔲 À faire | Anatomie pièces de viande (boucherie)      |
| Map       | Organ Data with SVG        | 🔲 À faire | Données médicales par organe               |
| Map       | Flight Seatmap with SVG    | 🔲 À faire | Occupation sièges avion                    |

### Candlestick

| Catégorie   | Titre                       | Statut     | Sujet métier suggéré           |
| ----------- | --------------------------- | ---------- | ------------------------------ |
| Candlestick | Basic Candlestick           | 🔲 À faire | Cours action Apple sur 1 mois  |
| Candlestick | OHLC Chart                  | 🔲 À faire | Prix du pétrole Brent          |
| Candlestick | ShangHai Index              | 🔲 À faire | Indice CAC 40                  |
| Candlestick | Large Scale Candlestick     | 🔲 À faire | Historique Bitcoin 5 ans       |
| Candlestick | Axis Pointer Link and Touch | 🔲 À faire | Crypto Ethereum avec volume    |
| Candlestick | Candlestick Brush           | 🔲 À faire | Analyse technique action Tesla |

### Radar

| Catégorie | Titre                  | Statut     | Sujet métier suggéré             |
| --------- | ---------------------- | ---------- | -------------------------------- |
| Radar     | Basic Radar Chart      | 🔲 À faire | Profil compétences candidat RH   |
| Radar     | AQI - Radar Chart      | 🔲 À faire | Qualité de l'air multi-polluants |
| Radar     | Customized Radar Chart | 🔲 À faire | Évaluation 360° d'un manager     |
| Radar     | Proportion of Browsers | 🔲 À faire | Comparaison features smartphones |
| Radar     | Multiple Radar         | 🔲 À faire | Benchmark produits concurrents   |

### Boxplot

| Catégorie | Titre                           | Statut     | Sujet métier suggéré                  |
| --------- | ------------------------------- | ---------- | ------------------------------------- |
| Boxplot   | Data Transform Simple Aggregate | 🔲 À faire | Distribution salaires par département |
| Boxplot   | Boxplot Light Velocity          | 🔲 À faire | Temps de réponse serveur              |
| Boxplot   | Boxplot Light Velocity2         | 🔲 À faire | Latence réseau par datacenter         |
| Boxplot   | Multiple Categories             | 🔲 À faire | Notes examens par matière             |

### Heatmap

| Catégorie | Titre                               | Statut     | Sujet métier suggéré                   |
| --------- | ----------------------------------- | ---------- | -------------------------------------- |
| Heatmap   | Heatmap on Cartesian                | 🔲 À faire | Affluence métro par heure et station   |
| Heatmap   | Heatmap - 20K data                  | 🔲 À faire | Activité GitHub commits sur l'année    |
| Heatmap   | Heatmap - Discrete Mapping of Color | 🔲 À faire | Niveaux d'alerte pollution par zone    |
| Heatmap   | Calendar Heatmap                    | 🔲 À faire | Activité sportive quotidienne (Strava) |

### Graph

| Catégorie | Titre                   | Statut     | Sujet métier suggéré            |
| --------- | ----------------------- | ---------- | ------------------------------- |
| Graph     | Force Layout            | 🔲 À faire | Réseau social d'une entreprise  |
| Graph     | Graph on Cartesian      | 🔲 À faire | Dépendances entre microservices |
| Graph     | Simple Graph            | 🔲 À faire | Organigramme équipe projet      |
| Graph     | Force Layout            | 🔲 À faire | Cartographie écosystème startup |
| Graph     | Les Miserables          | 🔲 À faire | Réseau de personnages série TV  |
| Graph     | Les Miserables Circular | 🔲 À faire | Interactions entre départements |

### Lines

| Catégorie | Titre                                  | Statut     | Sujet métier suggéré           |
| --------- | -------------------------------------- | ---------- | ------------------------------ |
| Lines     | Use lines to draw 1 million ny streets | 🔲 À faire | Réseau routier d'une métropole |

### Tree

| Catégorie | Titre                   | Statut     | Sujet métier suggéré                   |
| --------- | ----------------------- | ---------- | -------------------------------------- |
| Tree      | From Left to Right Tree | 🔲 À faire | Arborescence dossiers projet           |
| Tree      | Multiple Trees          | 🔲 À faire | Hiérarchie multi-filiales entreprise   |
| Tree      | From Bottom to Top Tree | 🔲 À faire | Arbre généalogique                     |
| Tree      | From Right to Left Tree | 🔲 À faire | Timeline historique inversée           |
| Tree      | Radial Tree             | 🔲 À faire | Taxonomie espèces animales             |
| Tree      | From Top to Bottom Tree | 🔲 À faire | Structure organisationnelle entreprise |

### Treemap

| Catégorie | Titre                                   | Statut     | Sujet métier suggéré                  |
| --------- | --------------------------------------- | ---------- | ------------------------------------- |
| Treemap   | Transition between Treemap and Sunburst | 🔲 À faire | Budget national par ministère         |
| Treemap   | Disk Usage                              | 🔲 À faire | Utilisation stockage cloud            |
| Treemap   | ECharts Option Query                    | 🔲 À faire | Catégories produits e-commerce        |
| Treemap   | Basic Treemap                           | 🔲 À faire | Répartition investissements portfolio |

### Sunburst

| Catégorie | Titre                        | Statut     | Sujet métier suggéré                |
| --------- | ---------------------------- | ---------- | ----------------------------------- |
| Sunburst  | Basic Sunburst               | 🔲 À faire | Origine géographique des ventes     |
| Sunburst  | Sunburst with Rounded Corner | 🔲 À faire | Hiérarchie catégories Netflix       |
| Sunburst  | Sunburst Label Rotate        | 🔲 À faire | Breakdown coûts projet construction |
| Sunburst  | Monochrome Sunburst          | 🔲 À faire | Structure fichiers code source      |
| Sunburst  | Drink Flavors                | 🔲 À faire | Gamme de produits cosmétiques       |

### Parallel

| Catégorie | Titre              | Statut     | Sujet métier suggéré                 |
| --------- | ------------------ | ---------- | ------------------------------------ |
| Parallel  | Basic Parallel     | 🔲 À faire | Comparaison specs voitures           |
| Parallel  | Parallel Aqi       | 🔲 À faire | Qualité air multi-villes             |
| Parallel  | Parallel Nutrients | 🔲 À faire | Composition nutritionnelle aliments  |
| Parallel  | Scatter Matrix     | 🔲 À faire | Corrélations indicateurs économiques |

### Sankey

| Catégorie | Titre                           | Statut     | Sujet métier suggéré                 |
| --------- | ------------------------------- | ---------- | ------------------------------------ |
| Sankey    | Basic Sankey                    | 🔲 À faire | Parcours utilisateur sur site web    |
| Sankey    | Sankey Orient Vertical          | 🔲 À faire | Flux migration population            |
| Sankey    | Specify ItemStyle for Each Node | 🔲 À faire | Budget familial (revenus → dépenses) |
| Sankey    | Sankey with Levels Setting      | 🔲 À faire | Supply chain approvisionnement       |
| Sankey    | Gradient Edge                   | 🔲 À faire | Flux énergétiques d'un pays          |

### Funnel

| Catégorie | Titre             | Statut     | Sujet métier suggéré               |
| --------- | ----------------- | ---------- | ---------------------------------- |
| Funnel    | Funnel Chart      | 🔲 À faire | Entonnoir de conversion e-commerce |
| Funnel    | Funnel Compare    | 🔲 À faire | Comparaison funnels A/B testing    |
| Funnel    | Customized Funnel | 🔲 À faire | Pipeline recrutement RH            |
| Funnel    | Multiple Funnels  | 🔲 À faire | Funnels par région commerciale     |

### Gauge

| Catégorie | Titre             | Statut     | Sujet métier suggéré              |
| --------- | ----------------- | ---------- | --------------------------------- |
| Gauge     | Gauge Basic chart | 🔲 À faire | Vitesse véhicule en temps réel    |
| Gauge     | Simple Gauge      | 🔲 À faire | Progression objectif commercial   |
| Gauge     | Speed Gauge       | 🔲 À faire | Débit connexion internet          |
| Gauge     | Progress Gauge    | 🔲 À faire | Avancement projet en pourcentage  |
| Gauge     | Stage Speed Gauge | 🔲 À faire | Niveau de risque cybersécurité    |
| Gauge     | Grade Gauge       | 🔲 À faire | Score de crédit client            |
| Gauge     | Ring Gauge        | 🔲 À faire | Objectifs fitness (pas, calories) |
| Gauge     | Clock             | 🔲 À faire | Horloge temps réel                |

### PictorialBar

| Catégorie    | Titre                                   | Statut     | Sujet métier suggéré               |
| ------------ | --------------------------------------- | ---------- | ---------------------------------- |
| PictorialBar | Transition between pictorialBar and bar | 🔲 À faire | Évolution parc automobile          |
| PictorialBar | Water Content                           | 🔲 À faire | Niveau hydratation journalier      |
| PictorialBar | Dotted bar                              | 🔲 À faire | Progression campagne crowdfunding  |
| PictorialBar | Expansion of forest                     | 🔲 À faire | Reforestation par année            |
| PictorialBar | Wish List and Mountain Height           | 🔲 À faire | Hauteur sommets alpins             |
| PictorialBar | Spirits                                 | 🔲 À faire | Production viticole par cépage     |
| PictorialBar | Vehicles                                | 🔲 À faire | Parc véhicules entreprise par type |

### ThemeRiver

| Catégorie  | Titre             | Statut     | Sujet métier suggéré                  |
| ---------- | ----------------- | ---------- | ------------------------------------- |
| ThemeRiver | ThemeRiver        | 🔲 À faire | Popularité genres musicaux sur 10 ans |
| ThemeRiver | ThemeRiver Lastfm | 🔲 À faire | Écoutes artistes sur l'année          |

### Calendar

| Catégorie | Titre                     | Statut     | Sujet métier suggéré                |
| --------- | ------------------------- | ---------- | ----------------------------------- |
| Calendar  | Simple Calendar           | 🔲 À faire | Jours de présence télétravail       |
| Calendar  | Calendar Heatmap          | 🔲 À faire | Contributions GitHub développeur    |
| Calendar  | Calendar Heatmap Vertical | 🔲 À faire | Consommation électrique quotidienne |
| Calendar  | Calendar Graph            | 🔲 À faire | Événements agenda professionnel     |
| Calendar  | Calendar Pie              | 🔲 À faire | Répartition temps par type de tâche |
| Calendar  | Calendar Charts           | 🔲 À faire | Métriques santé quotidiennes        |

### Matrix

| Catégorie | Titre                        | Statut     | Sujet métier suggéré                 |
| --------- | ---------------------------- | ---------- | ------------------------------------ |
| Matrix    | Simple Matrix                | 🔲 À faire | Matrice responsabilités projet RACI  |
| Matrix    | Correlation Matrix (Heatmap) | 🔲 À faire | Corrélations actifs financiers       |
| Matrix    | Correlation Matrix (Scatter) | 🔲 À faire | Relations variables marketing        |
| Matrix    | Confusion Matrix             | 🔲 À faire | Performance modèle IA classification |

### Chord

| Catégorie | Titre                 | Statut     | Sujet métier suggéré            |
| --------- | --------------------- | ---------- | ------------------------------- |
| Chord     | Basic Chord           | 🔲 À faire | Flux commerciaux entre pays     |
| Chord     | Chord minAngle        | 🔲 À faire | Collaborations inter-équipes    |
| Chord     | Chord lineStyle.color | 🔲 À faire | Échanges données entre systèmes |
| Chord     | Chord Style           | 🔲 À faire | Relations fournisseurs-clients  |

### Custom

| Catégorie | Titre                          | Statut     | Sujet métier suggéré                   |
| --------- | ------------------------------ | ---------- | -------------------------------------- |
| Custom    | Histogram with Custom Series   | 🔲 À faire | Distribution âges population           |
| Custom    | Profit                         | 🔲 À faire | Marge bénéficiaire par produit         |
| Custom    | Error Scatter on Catesian      | 🔲 À faire | Mesures scientifiques avec incertitude |
| Custom    | Custom Bar Trend               | 🔲 À faire | Tendance ventes avec variation         |
| Custom    | Custom Cartesian Polygon       | 🔲 À faire | Zones de confort thermique             |
| Custom    | Profile                        | 🔲 À faire | Profil altitude randonnée              |
| Custom    | Gantt Chart of Airport Flights | 🔲 À faire | Planning équipes de production         |

### Dataset

| Catégorie | Titre                     | Statut     | Sujet métier suggéré               |
| --------- | ------------------------- | ---------- | ---------------------------------- |
| Dataset   | Sort Data in Bar Chart    | 🔲 À faire | Classement vendeurs par CA         |
| Dataset   | Simple Encode             | 🔲 À faire | Données RH multi-dimensions        |
| Dataset   | Partition Data to Pies    | 🔲 À faire | Répartition budget par département |
| Dataset   | Default arrangement       | 🔲 À faire | Tableau de bord KPIs               |
| Dataset   | Simple Example of Dataset | 🔲 À faire | Données météo multi-villes         |

### DataZoom

| Catégorie | Titre                          | Statut     | Sujet métier suggéré              |
| --------- | ------------------------------ | ---------- | --------------------------------- |
| DataZoom  | Error Scatter on Catesian      | 🔲 À faire | Données capteurs IoT avec zoom    |
| DataZoom  | Large scale area chart         | 🔲 À faire | Historique cours crypto-monnaie   |
| DataZoom  | Gantt Chart of Airport Flights | 🔲 À faire | Planning maintenance industrielle |
| DataZoom  | Wind Barb                      | 🔲 À faire | Données anémomètre station météo  |

### Graphic

| Catégorie | Titre                        | Statut     | Sujet métier suggéré            |
| --------- | ---------------------------- | ---------- | ------------------------------- |
| Graphic   | Stroke Animation             | 🔲 À faire | Animation logo entreprise       |
| Graphic   | Customized Loading Animation | 🔲 À faire | Loader personnalisé application |
| Graphic   | Wave Animation               | 🔲 À faire | Indicateur niveau réservoir     |
| Graphic   | Custom Graphic Component     | 🔲 À faire | Graphique avec annotations      |
| Graphic   | Draggable Points             | 🔲 À faire | Éditeur courbe de Bézier        |

### Rich Text

| Catégorie | Titre              | Statut     | Sujet métier suggéré        |
| --------- | ------------------ | ---------- | --------------------------- |
| Rich      | Pie Special Label  | 🔲 À faire | Répartition votes élection  |
| Rich      | Nested Pies        | 🔲 À faire | Structure organisationnelle |
| Rich      | Weather Statistics | 🔲 À faire | Bulletin météo hebdomadaire |

### 3D Globe

| Catégorie | Titre                      | Statut     | Sujet métier suggéré          |
| --------- | -------------------------- | ---------- | ----------------------------- |
| Globe     | Animating Contour on Globe | 🔲 À faire | Courants océaniques mondiaux  |
| Globe     | Globe with Atmosphere      | 🔲 À faire | Visualisation satellite Terre |
| Globe     | Globe Displacement         | 🔲 À faire | Topographie mondiale          |
| Globe     | ECharts-GL Hello World     | 🔲 À faire | Localisation datacenters      |
| Globe     | Globe Layers               | 🔲 À faire | Couches atmosphériques        |
| Globe     | Moon                       | 🔲 À faire | Missions spatiales lunaires   |

### 3D Bar

| Catégorie | Titre                     | Statut     | Sujet métier suggéré           |
| --------- | ------------------------- | ---------- | ------------------------------ |
| Bar3D     | 3D Bar with Dataset       | 🔲 À faire | Ventes par région et trimestre |
| Bar3D     | Bar3D - Global Population | 🔲 À faire | Population mondiale 3D         |
| Bar3D     | Bar3D - Myth              | 🔲 À faire | Données archéologiques 3D      |
| Bar3D     | Bar3D - Punch Card        | 🔲 À faire | Activité GitHub 3D             |

### 3D Scatter

| Catégorie | Titre                        | Statut     | Sujet métier suggéré            |
| --------- | ---------------------------- | ---------- | ------------------------------- |
| Scatter3D | Scatter3D                    | 🔲 À faire | Clustering données 3D ML        |
| Scatter3D | 3D Scatter with Dataset      | 🔲 À faire | Caractéristiques produits 3D    |
| Scatter3D | Scatter3D - Globe Population | 🔲 À faire | Villes mondiales par population |

### 3D Surface

| Catégorie | Titre          | Statut     | Sujet métier suggéré       |
| --------- | -------------- | ---------- | -------------------------- |
| Surface   | Simple Surface | 🔲 À faire | Modélisation terrain 3D    |
| Surface   | Breather       | 🔲 À faire | Visualisation mathématique |
| Surface   | Golden Rose    | 🔲 À faire | Art génératif 3D           |
| Surface   | Metal Surface  | 🔲 À faire | Rendu matériau industriel  |

### 3D Map

| Catégorie | Titre     | Statut     | Sujet métier suggéré    |
| --------- | --------- | ---------- | ----------------------- |
| Map3D     | Buildings | 🔲 À faire | Maquette urbaine 3D     |
| Map3D     | Wood City | 🔲 À faire | Planification urbanisme |

### 3D Lines

| Catégorie | Titre            | Statut     | Sujet métier suggéré       |
| --------- | ---------------- | ---------- | -------------------------- |
| Lines3D   | Airline on Globe | 🔲 À faire | Routes aériennes mondiales |
| Lines3D   | Flights          | 🔲 À faire | Trafic aérien temps réel   |
| Lines3D   | Flights GL       | 🔲 À faire | Flux migration oiseaux     |

### 3D Line

| Catégorie | Titre                   | Statut     | Sujet métier suggéré  |
| --------- | ----------------------- | ---------- | --------------------- |
| Line3D    | Orthographic Projection | 🔲 À faire | Trajectoire satellite |

### Scatter GL

| Catégorie | Titre                      | Statut     | Sujet métier suggéré         |
| --------- | -------------------------- | ---------- | ---------------------------- |
| ScatterGL | 10 million Bulk GPS points | 🔲 À faire | Données GPS flotte véhicules |

### Lines GL

| Catégorie | Titre                                    | Statut     | Sujet métier suggéré       |
| --------- | ---------------------------------------- | ---------- | -------------------------- |
| LinesGL   | Use linesGL to draw 1 million ny streets | 🔲 À faire | Réseau électrique national |

### Flow GL

| Catégorie | Titre                 | Statut     | Sujet métier suggéré        |
| --------- | --------------------- | ---------- | --------------------------- |
| FlowGL    | Flow on the cartesian | 🔲 À faire | Simulation fluide dynamique |

### Graph GL

| Catégorie | Titre                         | Statut     | Sujet métier suggéré          |
| --------- | ----------------------------- | ---------- | ----------------------------- |
| GraphGL   | GraphGL GPU Layout            | 🔲 À faire | Réseau neurones visualisation |
| GraphGL   | GraphGL - Large Internet      | 🔲 À faire | Topologie réseau internet     |
| GraphGL   | NPM Dependencies with graphGL | 🔲 À faire | Dépendances packages monorepo |
