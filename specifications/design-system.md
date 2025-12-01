# 🎨 Design System — _echarts-realiste_

## 🌈 Identité visuelle – Palette Viridis (réinterprétée)

L’interface utilisateur s’inspire de la palette **Viridis**, uniquement pour les éléments de l’UI.  
Les couleurs des graphiques ECharts **ne doivent jamais être affectées** par ce design system.

### Palette UI

- **viridis-dark** `#440154`  
  Accents discrets, titres secondaires, éléments structurels.

- **viridis-mid** `#31688E`  
  Liens, sous-titres, éléments interactifs.

- **viridis-light** `#35B779`  
  Boutons primaires, mises en avant positives.

- **viridis-bright** `#FDE725`  
  Effets de hover, mini-highlights.

---

## 🖋️ Typographie

### Police

- Sans-serif moderne (par défaut Tailwind CSS).
- Styles privilégiant **lisibilité et sobriété**.

### Titres

- `font-semibold`
- Couleur : `var(--viridis-mid)`
- Espacement vertical : `mt-8 mb-4`
- Aucune transformation type uppercase forcée

### Paragraphes

- Taille minimale : **16px**
- `leading-relaxed`
- Couleur : `#333333`
- Largeur max : `max-w-2xl`

---

## 🔗 Liens

- Couleur par défaut : `viridis-mid`
- Hover : passage vers `viridis-light`
- Soulignement uniquement au survol
- Transition douce : `transition-colors`

---

## 🔘 Boutons

### Bouton primaire

- Fond : **gradient viridis** `linear-gradient(135deg, #440154, #31688E, #35B779, #FDE725)`
- Texte : `#ffffff`
- Coins : `rounded-lg`
- Padding : `px-4 py-2`
- Hover : luminosité légèrement augmentée (`brightness-110`)
- Ombre discrète : `shadow-sm`
- Classes Tailwind : `bg-gradient-to-r from-[#440154] via-[#31688E] to-[#35B779]`

### Bouton secondaire

- Fond : transparent
- Texte : **gradient viridis** (via `bg-clip-text text-transparent`)
- Bordure : `1px solid var(--viridis-mid)`
- Coins : `rounded-lg`
- Hover : bordure en gradient viridis, opacité +10%
- Classes Tailwind : `bg-gradient-to-r from-[#440154] via-[#31688E] to-[#35B779] bg-clip-text text-transparent`

---

## 📦 Cartes / Panneaux

- Fond : `#ffffff`
- Bordure : `1px solid #e8e8e8`
- Coins : `rounded-xl`
- Padding interne : `p-6`
- Ombre légère : `shadow-md`
- Titre de carte : `viridis-dark`
- Texte secondaire : `#444444`

---

## 🧱 Mise en page & espacement

- **Mobile-first**
- Espacements Tailwind standards (`4 → 8 → 12 → 16`)
- Sections espacées : `my-12`
- Utilisation modérée de la grille (`grid`, `gap-4`, `md:grid-cols-2`)

---

## 🌐 Règles générales

1. Le design system **ne modifie jamais les couleurs des graphes ECharts**.
2. L'UI utilise exclusivement la palette Viridis réinterprétée.
3. Priorité à la lisibilité : typographie claire, contrastes doux.
4. Actions visibles mais non agressives (hover subtils).
5. Composants cohérents, sobres, faciles à reconnaître.
