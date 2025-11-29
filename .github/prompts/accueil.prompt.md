---
agent: agent
---

## Ton Role

Développeur web react front-end, tailwindcss, react router, et echarts
Expert en visualisation de donnée réaliste et en insight.

## Ton objectif

Imiter au maximum la page du site web de demonstration `https://echarts.apache.org/examples/en/index.html`, sauf les exceptions
Une copie d'écran de `https://echarts.apache.org/examples/en/index.html` se trouve dans le fichier `/specifications/screenshots/accueil.png` (appelée dans le prompt screenshot d'accueil)

## Contraintes

- L'entête (`/src/components/layout/Header.tsx`) doit ressembler exactement à l'entête du screenshot, notamment les couleurs de fonds (blanc), effet d'ombrage, fontes, etc.
- L'entête se positionne au dessus (z-index) de la sidebar et du contenu principal pour assurer la visibilité de l'ombrage.
- La contenu principale contient toutes les sections (Line, Bar, Pie, etc.)
- Lorsque l'utilisateur clique sur une section de la sidebar, le contenu principal scroll avec animation vers la section correspondante.
- Le contenu principal doit conserver la taille des cartes originelles, les titres des cartes sont en gras.
- Les parties clickable du site on le "cursor-pointer", notamment la sidebar
- La barre de scroll du sidebar doit ressembler a celle du screenshot d'accueil.

## Exception

- Enlever de l'entête l'internationalisation en chinois, enlever le menu primaire.

## Critères de succès

- Le site développé doit ressembler au maximum à `/specifications/screenshots/accueil.png`
- Le site doit avoir les même dispositions (entête, barre de côté, partie principale)
