---
agent: agent
---

# Réorganisation de la Page Pédagogie

## Objectif

Transformer la page `/pedagogie` (`Pedagogy.tsx`) pour qu'elle affiche des sections avec des graphiques interactifs (dataviz), similaire à la page `/examples` (`Examples.tsx`).

## 🔄 Mode d'exécution : Incrémental

**Ce prompt est un fichier d'instructions statique qui reste inchangé.** Il est conçu pour être exécuté plusieurs fois.

À chaque exécution, l'agent doit :

1. **Lire `src/components/pedagogy/PedagogyGrid.tsx`** pour connaître l'état d'avancement (quels exemples existent déjà dans `pedagogyData`)
2. **Générer maximum 2 exemples** : Créer au plus 2 nouvelles paires Don't/Do par exécution
3. **Mettre à jour `pedagogyData`** dans `PedagogyGrid.tsx` : Ajouter les nouveaux exemples au tableau existant
4. **Créer les composants** dans `src/pages/pedagogy/<section>/`
5. **Rapporter** ce qui a été fait et ce qui reste à faire

### Catégories cibles (minimum 2 exemples chacune)

| Catégorie        | ID        |
| ---------------- | --------- |
| Bonnes pratiques | `general` |
| Couleurs         | `colors`  |
| Étiquettes       | `labels`  |
| Axes             | `axes`    |
| Légendes         | `legend`  |
| Lignes           | `line`    |
| Barres           | `bar`     |
| Circulaires      | `pie`     |
| Nuages           | `scatter` |

**L'état réel est toujours déterminé en lisant le code, jamais en se fiant à ce prompt.**

## ⚠️ IMPORTANT : Données réalistes obligatoires

**Ce site se démarque par l'utilisation de données RÉALISTES.** Chaque graphique généré DOIT être réaliste, c'est-à-dire :

| Critère                      | Description                                                                                          |
| ---------------------------- | ---------------------------------------------------------------------------------------------------- |
| **Scénario contextualisé**   | Intègre une histoire et un contexte précis (ex: "Ventes trimestrielles de TechCorp en 2024")         |
| **Compréhension immédiate**  | Le lecteur comprend tout de suite de quoi il s'agit sans explication supplémentaire                  |
| **Grille de lecture claire** | Axes, légendes et annotations guident la lecture des données                                         |
| **Unités explicites**        | Les unités sont toujours visibles et compréhensibles (€, %, kg, habitants, etc.)                     |
| **Message clair**            | Un message est transmis : décision à prendre, problème à conscientiser, ou bonne nouvelle à partager |

### Ce qu'il faut éviter :

- ❌ **Pas de données génériques** : éviter "Category A", "Value 1", "Series 1"
- ❌ **Pas de données aléatoires** : les valeurs doivent avoir du sens dans leur contexte
- ❌ **Pas de graphiques sans histoire** : chaque dataviz doit raconter quelque chose

## ⚠️ IMPORTANT : Dataviz exemplaires

Chaque graphique "Do" (bonne pratique) DOIT être une **dataviz exemplaire** respectant ces critères :

| Critère           | Description                                                                 |
| ----------------- | --------------------------------------------------------------------------- |
| **Lisibilité**    | Textes lisibles, tailles de police adaptées, contraste suffisant            |
| **Cohérence**     | Choix du type de graphique adapté aux données, échelles cohérentes          |
| **Insight**       | Le graphique raconte une histoire, met en évidence un fait marquant         |
| **Compréhension** | Titre explicite, légende claire, annotations si nécessaire                  |
| **Efficacité**    | Ratio données/encre optimal, pas d'éléments décoratifs inutiles (chartjunk) |

Les graphiques "Don't" doivent volontairement enfreindre un ou plusieurs de ces critères pour illustrer la mauvaise pratique.

## État actuel

- La page `Pedagogy.tsx` existe avec une sidebar et un système de navigation par sections
- Le composant `PedagogyGrid.tsx` affiche actuellement un message "Contenu pédagogique à venir" car `pedagogyData` est vide
- Le composant `PedagogyCard.tsx` affiche des cartes avec comparaison Don't/Do (images statiques)

## Changements demandés

### 1. Modifier `PedagogyGrid.tsx`

- **Ajouter au minimum 2 exemples de dataviz par catégorie** (comme dans `ExamplesGrid.tsx`)
- Chaque exemple doit être un **vrai graphique ECharts interactif** (pas une image statique)
- Les graphiques doivent illustrer des **bonnes pratiques** vs **mauvaises pratiques** de visualisation de données

### 2. Structure des sections

Chaque section doit contenir des exemples pédagogiques avec :

- **Titre descriptif** du concept enseigné
- **Graphique "Don't"** : exemple de mauvaise pratique (ex: couleurs confuses, axes mal calibrés, légendes absentes)
- **Graphique "Do"** : exemple de bonne pratique corrigée
- **Explication courte** de la différence

### 3. Catégories à peupler (minimum 2 exemples chacune)

| Catégorie        | ID        | Exemples suggérés                                                     |
| ---------------- | --------- | --------------------------------------------------------------------- |
| Bonnes pratiques | `general` | Ratio données/encre, simplicité vs surcharge                          |
| Couleurs         | `colors`  | Palettes accessibles, contraste suffisant, daltonisme                 |
| Étiquettes       | `labels`  | Positionnement, lisibilité, rotation excessive                        |
| Axes             | `axes`    | Échelles tronquées, intervalles réguliers, axes inversés              |
| Légendes         | `legend`  | Placement, clarté, légendes redondantes                               |
| Lignes           | `line`    | Trop de séries, épaisseur des traits, zones remplies                  |
| Barres           | `bar`     | Effets 3D trompeurs, barres empilées vs groupées                      |
| Circulaires      | `pie`     | Trop de segments, angles difficiles à comparer, alternatives (barres) |
| Nuages           | `scatter` | Overplotting, taille des points, axes non linéaires                   |

### 4. Format des données

Utiliser le même format que `ExamplesGrid.tsx` mais adapté pour les paires Don't/Do :

```typescript
interface PedagogyExample {
  id: string;
  title: string;
  description: string;
  category: string;
  // Liens internes vers les pages de graphiques (comme dans ExamplesGrid.tsx)
  dontLink: string; // Ex: "/pedagogy/axes/truncated-axis-dont"
  doLink: string; // Ex: "/pedagogy/axes/truncated-axis-do"
}
```

**Note :** Les composants de graphiques sont des pages complètes avec `ChartEditor`, pas des composants embarqués. Les liens pointent vers ces pages.

### 5. Créer les composants de graphiques

Pour chaque exemple pédagogique, créer **2 composants React** dans `/src/pages/pedagogy/<section>/` :

- `/src/pages/pedagogy/<section>/{ConceptName}Dont.tsx` : graphique illustrant la mauvaise pratique
- `/src/pages/pedagogy/<section>/{ConceptName}Do.tsx` : graphique illustrant la bonne pratique

Où `<section>` correspond à l'ID de la catégorie (`general`, `colors`, `labels`, `axes`, `legend`, `line`, `bar`, `pie`, `scatter`).

**⚠️ IMPORTANT : Utiliser le même pattern que les pages existantes !**

Chaque composant DOIT utiliser le composant `ChartEditor` exactement comme les autres exemples du site (voir `/src/pages/bar/`, `/src/pages/line/`, etc.).

**Structure obligatoire de chaque fichier :**

```tsx
import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

const option: EChartsOption = {
  // Configuration ECharts du graphique
};

const notes = `
## 📚 Note pédagogique : [Titre du concept]

### ❌ Pourquoi c'est une mauvaise pratique (pour les fichiers *Dont.tsx)
// OU
### ✅ Pourquoi c'est une bonne pratique (pour les fichiers *Do.tsx)

[Explication détaillée...]
`;

export default function NomDuComposant() {
  return (
    <ChartEditor
      title="Titre du graphique"
      section="Pedagogy"
      option={option}
      notes={notes}
    />
  );
}
```

**Points clés :**

- Utiliser `section="Pedagogy"` pour tous les exemples pédagogiques
- Le `title` doit être explicite et indiquer si c'est un Don't ou Do
- Les `notes` doivent expliquer pourquoi c'est une bonne ou mauvaise pratique

## Exemple concret

Pour la catégorie "Axes" avec le concept "Échelle tronquée" :

1. **Fichier** : `/src/pages/pedagogy/axes/TruncatedAxisDont.tsx`

```tsx
import { ChartEditor } from "../../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

const option: EChartsOption = {
  title: {
    text: "Parts de marché navigateurs - T4 2024",
    subtext: "⚠️ Attention : axe tronqué !",
    left: "center",
  },
  // ... graphique en barres avec axe Y commençant à 60% au lieu de 0
  yAxis: {
    type: "value",
    min: 60, // ❌ Axe tronqué !
    max: 70,
  },
  // ...
};

const notes = `
## 📚 Note pédagogique : Axe Y tronqué

### ❌ Pourquoi c'est une mauvaise pratique

Un axe Y ne commençant pas à 0 **exagère visuellement les différences** entre les valeurs.
Dans cet exemple, Chrome (65%) semble 10x plus grand que Firefox (2.8%) alors que
le ratio réel est d'environ 23x.

**Problèmes :**
- Induit le lecteur en erreur
- Exagère les écarts
- Peut être utilisé pour manipuler la perception

**Quand c'est acceptable :**
- Données avec une baseline naturelle (ex: température en °C)
- Variations très faibles sur une grande valeur (ex: cours de bourse)
- À condition d'indiquer clairement que l'axe est tronqué
`;

export default function TruncatedAxisDont() {
  return (
    <ChartEditor
      title="❌ Axe Y tronqué (mauvaise pratique)"
      section="Pedagogy"
      option={option}
      notes={notes}
    />
  );
}
```

2. **Fichier** : `/src/pages/pedagogy/axes/TruncatedAxisDo.tsx`
   - Même graphique avec axe Y commençant à 0
   - Proportions visuelles correctes
   - **Mêmes données réalistes** pour permettre la comparaison

## Résultat attendu

- La page `/pedagogie` affiche des **sections scrollables** avec des graphiques interactifs
- Chaque section contient **au moins 2 exemples** de paires Don't/Do
- Les graphiques sont **cliquables** et redirigent vers une page de détail (comme `/examples`)
- La navigation par la sidebar fonctionne (scroll vers les sections)

## Fichiers à modifier/créer

| Action   | Fichier                                                                                       |
| -------- | --------------------------------------------------------------------------------------------- |
| Modifier | `src/components/pedagogy/PedagogyGrid.tsx`                                                    |
| Modifier | `src/components/pedagogy/PedagogyCard.tsx` (utiliser des liens, pas des composants embarqués) |
| Modifier | `src/App.tsx` (ajouter les routes pour les nouvelles pages)                                   |
| Créer    | `src/pages/pedagogy/<section>/*.tsx` (pages complètes avec ChartEditor)                       |

## 📋 Instructions de reprise

À chaque nouvelle exécution de ce prompt :

1. **Lire** `src/components/pedagogy/PedagogyGrid.tsx` pour identifier les exemples existants dans `pedagogyData`
2. **Compter** combien d'exemples existent déjà par catégorie
3. **Choisir** la prochaine catégorie vide ou incomplète (< 2 exemples)
4. **Créer** maximum 2 paires Don't/Do (4 fichiers de composants max)
5. **Mettre à jour** `pedagogyData` dans `PedagogyGrid.tsx`
6. **Rapporter** ce qui a été fait et ce qui reste à faire

⚠️ **Ce fichier prompt reste INCHANGÉ.** Seuls les fichiers de code sont modifiés.

**Ne jamais générer plus de 2 exemples par exécution.**
