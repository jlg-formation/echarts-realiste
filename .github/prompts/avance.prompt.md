---
agent: agent
---

# Génération du Plan de Suivi des Diagrammes

## Contexte

Ce projet est une galerie d'exemples ECharts. Chaque exemple de graphique doit être transformé pour utiliser des **données métier réalistes et crédibles** au lieu des données génériques par défaut.

Actuellement, certains exemples ont déjà leur propre page React (avec `internalLink` dans `ExamplesGrid.tsx`), tandis que d'autres pointent encore vers le site officiel Apache ECharts.

## Ta mission

Génère ou mets à jour le fichier `/specifications/00-plan.md` qui sert de **tableau de bord de suivi** pour savoir quels diagrammes ont été traités et lesquels restent à faire.

## Sources de données

1. **`src/components/examples/ExamplesGrid.tsx`** : contient la liste de tous les exemples avec leur `id`, `title`, `category` et éventuellement `internalLink`
2. **`src/pages/`** : contient les pages React déjà créées pour les exemples traités

## Structure attendue du fichier `/specifications/00-plan.md`

```markdown
# Plan de Réalisation - Exemples ECharts Réalistes

## Progression

- ✅ Traités : X / Y
- 🔲 Restants : Z

## Comment traiter un ou plusieurs diagrammes

Pour traiter des diagrammes, utilise le prompt **realiste.prompt.md** avec les arguments `section`, `titre` et `count` :
```

@realiste.prompt.md section="<NomSection>" titre="<TitreDuDiagramme>" count=<nombre>

```

### Paramètre `count`

Le paramètre `count` (valeur par défaut : **1**) spécifie le **nombre de diagrammes consécutifs à traiter** en partant de la ligne indiquée dans le tableau de suivi.

- `count=1` : traite uniquement le diagramme spécifié par `section` et `titre`
- `count=3` : traite le diagramme spécifié **puis les 2 suivants** dans le tableau (3 au total)
- `count=5` : traite 5 diagrammes consécutifs à partir de celui spécifié

**Exemples :**

- `@realiste.prompt.md section="Line" titre="Smoothed Line Chart"` → traite 1 seul diagramme
- `@realiste.prompt.md section="Line" titre="Smoothed Line Chart" count=3` → traite ce diagramme + les 2 suivants du tableau

## Tableau de suivi

| Catégorie | Titre                | Statut     | Sujet métier suggéré         |
| --------- | -------------------- | ---------- | ---------------------------- |
| Line      | Basic Line Chart     | ✅ Fait    | Température mensuelle        |
| Line      | Smoothed Line Chart  | ✅ Fait    | Cours de bourse              |
| Bar       | Basic Bar            | 🔲 À faire | Ventes par région            |
| Pie       | Referer of a Website | 🔲 À faire | Répartition budget marketing |
| ...       | ...                  | ...        | ...                          |
```

## Règles importantes

1. **Statut "✅ Fait"** : l'exemple possède un `internalLink` dans `ExamplesGrid.tsx` ET sa page existe dans `src/pages/`
2. **Statut "🔲 À faire"** : l'exemple n'a pas encore de page interne
3. **Sujet métier suggéré** : propose un contexte métier **varié et crédible** pour chaque diagramme. Évite de répéter les mêmes domaines. Exemples de domaines :

   **🏥 Santé & Médical**
   - Hôpital (admissions, lits disponibles, temps d'attente urgences)
   - Épidémiologie (propagation virus, vaccination, cas par région)
   - Pharmacie (stocks médicaments, prescriptions, ruptures)
   - Clinique vétérinaire (consultations, espèces traitées)

   **💰 Finance & Économie**
   - Trading (cours actions, volumes, volatilité)
   - Crypto-monnaies (prix Bitcoin, exchanges, whale movements)
   - Budget personnel/entreprise (dépenses, revenus, épargne)
   - Immobilier (prix m², transactions, loyers par quartier)
   - Assurance (sinistres, primes, ratio de couverture)

   **🏭 Industrie & Production**
   - Usine (cadence production, taux de rebut, maintenance)
   - Qualité (défauts détectés, contrôles, rappels produits)
   - Supply chain (stocks, délais fournisseurs, ruptures)
   - Énergie (consommation électrique, pics de charge)

   **🚗 Transport & Logistique**
   - Trafic routier (embouteillages, accidents, flux horaires)
   - Aérien (retards vols, taux remplissage, destinations)
   - Maritime (containers, ports, routes commerciales)
   - Livraison (colis livrés, retours, temps de transit)
   - Transports en commun (fréquentation métro/bus, retards)

   **🎓 Éducation & Formation**
   - École (notes, absences, réussite aux examens)
   - Université (inscriptions par filière, taux diplomation)
   - E-learning (complétion cours, engagement, certifications)
   - Bibliothèque (emprunts, fréquentation, collections)

   **🌍 Environnement & Climat**
   - Pollution (qualité air, particules fines, sources)
   - Énergie renouvelable (production solaire/éolien, mix énergétique)
   - Climat (températures, précipitations, événements extrêmes)
   - Biodiversité (populations espèces, zones protégées)
   - Déchets (tri, recyclage, tonnages collectés)

   **⚽ Sport & Loisirs**
   - Football (buts, possession, classements)
   - Fitness (calories, pas, fréquence cardiaque)
   - E-sport (scores, temps de jeu, classements)
   - Tourisme (visiteurs, nuitées, saisonnalité)
   - Cinéma (entrées, box-office, audiences)

   **🛒 E-commerce & Retail**
   - Paniers (montant moyen, abandon, conversion)
   - Inventaire (stocks, ruptures, rotation)
   - Avis clients (notes, sentiments, NPS)
   - Promotions (impact soldes, codes promo)

   **👥 RH & Management**
   - Recrutement (candidatures, temps embauche, sources)
   - Turnover (départs, ancienneté, motifs)
   - Formation (heures, budget, compétences acquises)
   - Télétravail (jours, productivité, satisfaction)
   - Diversité (genre, âge, handicap)

   **🌾 Agriculture & Alimentaire**
   - Récoltes (rendements, surfaces, variétés)
   - Météo agricole (irrigation, gel, canicule)
   - Élevage (cheptel, production lait/viande)
   - Restauration (couverts, plats vendus, gaspillage)

   **🏠 Immobilier & Construction**
   - Chantiers (avancement, retards, budget)
   - Domotique (consommation, température, sécurité)
   - Copropriété (charges, travaux, assemblées)

   **📱 Tech & Digital**
   - Application mobile (téléchargements, DAU/MAU, rétention)
   - SaaS (MRR, churn, upgrades)
   - Cybersécurité (attaques, vulnérabilités, incidents)
   - IoT (capteurs, alertes, maintenance prédictive)

   **🏛️ Secteur public & Collectivités**
   - Mairie (état civil, permis, réclamations)
   - Police (délits, interventions, zones)
   - Pompiers (interventions, temps réponse, types)
   - Eau/Assainissement (consommation, fuites, qualité)

## Critères de succès

- [ ] Le fichier `/specifications/00-plan.md` est créé ou mis à jour
- [ ] Tous les exemples de `ExamplesGrid.tsx` sont listés dans le tableau
- [ ] Les statuts reflètent l'état réel du code (présence ou non d'`internalLink` + page existante)
- [ ] Chaque diagramme "À faire" a un sujet métier unique et pertinent suggéré
- [ ] Le compteur de progression est correct
