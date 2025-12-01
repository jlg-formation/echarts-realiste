---
agent: agent
---

# Réorganisation du Sitemap

## Objectif

Réorganiser la structure des URLs (sitemap) du site.

## Changements demandés

### 1. Renommer la page d'accueil actuelle

- **Fichier actuel :** `Home.tsx` (URL : `/`)
- **Nouveau fichier :** `Examples.tsx` (URL : `/examples/`)
- Cette page contient actuellement la grille d'exemples de graphiques

### 2. Créer une nouvelle page d'accueil

- **Nouveau fichier :** `Home.tsx` (URL : `/`)
- **Contenu :** Une vraie page d'accueil marketing avec :
  - Une **tagline** (phrase d'accroche) présentant le site
  - Un **bouton CTA** (Call-To-Action) redirigeant vers `/examples/`
  - Une présentation générale du projet

### 3. Créer une page Pédagogie

- **Nouveau fichier :** `Pedagogy.tsx` (URL : `/pedagogie`)
- **Structure :** Identique à `Examples.tsx` (avec Sidebar et grille d'exemples)
- **Contenu :** Des exemples pédagogiques de type "Don't / Do" :
  - Montrer ce qu'il **ne faut pas faire** (mauvaises pratiques)
  - Montrer ce qu'il **faut faire** (bonnes pratiques)
- **Fonctionnement :**
  - Les exemples seront ajoutés progressivement au fur et à mesure
  - Chaque exemple pédagogique contiendra une paire : mauvais exemple vs bon exemple
  - Utiliser le même système de catégories et de navigation que `/examples`
- **Composants à créer :**
  - `PedagogyGrid.tsx` : similaire à `ExamplesGrid.tsx`
  - `PedagogyCard.tsx` : carte avec comparaison Don't/Do
  - Réutiliser le composant `Sidebar.tsx` existant (ou créer une variante si nécessaire)

## Résultat attendu

| URL          | Page                                         |
| ------------ | -------------------------------------------- |
| `/`          | Nouvelle page d'accueil (présentation + CTA) |
| `/examples`  | Ancienne page d'accueil (grille d'exemples)  |
| `/pedagogie` | Page pédagogique (exemples Don't/Do)         |
