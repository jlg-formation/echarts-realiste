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

## Résultat attendu

| URL         | Page                                         |
| ----------- | -------------------------------------------- |
| `/`         | Nouvelle page d'accueil (présentation + CTA) |
| `/examples` | Ancienne page d'accueil (grille d'exemples)  |
