# Spécifications détaillées du projet : Visualisation du Perceptron 2D

**Date** : 2025-04-15  
**Auteur** : Jean-Louis Guénégo  
**Nom du projet** : perceptron-demo

---

## 🎯 Objectif

Créer une application web interactive permettant à un utilisateur de :

- Placer des points rouges ou bleus sur un plan 2D.
- Lancer un entraînement de perceptron pour classer les points.
- Visualiser la droite de décision calculée en SVG.
- Comprendre le fonctionnement du perceptron de manière pédagogique.

---

## ⚙️ Stack technique

| Élément            | Choix                                                    |
| ------------------ | -------------------------------------------------------- |
| Framework          | React                                                    |
| Build tool         | Vite                                                     |
| Langage            | TypeScript                                               |
| CSS                | TailwindCSS v4 (installé selon documentation officielle) |
| Visualisation      | SVG (préféré à canvas)                                   |
| Gestion de paquets | pnpm                                                     |
| Linter / Formatter | ESLint + Prettier                                        |
| Déploiement        | GitHub Pages (via GitHub Actions)                        |
| Tests              | Aucun                                                    |

---

## 📐 Structure de l'interface

### Disposition

- **Zone principale gauche** : plan cartésien interactif (SVG)
- **Panneau latéral droit** : interface utilisateur (boutons, paramètres, légende)

---

## 🖱️ Fonctionnalités utilisateur

### 1. Ajout de points

- L'utilisateur peut cliquer dans la zone graphique pour placer un point.
- Une **classe** (rouge ou bleu) est sélectionnée au préalable.
- Les points sont enregistrés sous forme `{ x: number, y: number, label: -1 | 1 }`.

### 2. Contrôles

- Sélecteur de classe :
  - 🔘 Bleu (label +1)
  - 🔴 Rouge (label -1)
- Bouton **Réinitialiser** : efface tous les points et la droite.
- Bouton **Apprendre** : lance l'entraînement du perceptron.
- Affichage de la droite de décision (en SVG).

### 3. Paramètres ajustables

- **Taux d’apprentissage** `α` (input numérique ou slider).
- **Nombre maximal d’itérations** (epoch).

### 4. Résultats visibles

- Nombre d’epochs réalisés
- Nombre d’erreurs lors de la dernière itération
- Valeurs des poids du perceptron (`w1`, `w2`, `b`)
- Droite de décision (actualisée dynamiquement)

---

## 🧠 Fonctionnement du perceptron

### Données

- Entrées : coordonnées `(x, y)` des points.
- Labels : `+1` (bleu) ou `-1` (rouge)

### Modèle

- Fonction d’activation : `f(z) = +1 si z ≥ 0, sinon -1`
- Calcul : `z = w1 * x + w2 * y + b`

### Entraînement

- Itératif sur tous les points.
- À chaque erreur, mise à jour des poids :
  - `w1 += α * erreur * x`
  - `w2 += α * erreur * y`
  - `b  += α * erreur`
- Stoppe si plus d’erreur ou si nombre max d’epochs atteint.

### Affichage de la droite

- Forme de la droite : `w1 * x + w2 * y + b = 0` ⇨ `y = (-w1 * x - b) / w2`
- Tracée en SVG sur le plan, entre les bords du viewport.

---

## 🧪 Expériences pédagogiques possibles

- Montrer l’apprentissage pas à pas (animation par epoch)
- Permettre des cas non-linéairement séparables pour illustrer les limites du perceptron
- Réinitialisation et reconfiguration rapide pour expérimenter

---

## 🗃️ Structure des fichiers

```
perceptron-demo/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Canvas.tsx
│   │   ├── Controls.tsx
│   │   └── Perceptron.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── tailwind.config.js
├── vite.config.ts
├── eslint.config.js
├── prettier.config.js
└── package.json
```

---

## 🚀 Déploiement

- Automatisé avec GitHub Actions via `peaceiris/actions-gh-pages`.
- `vite.config.ts` configuré avec `base: '/perceptron-demo/'`
- Le site est disponible sur `https://<username>.github.io/perceptron-demo/`

---

## ✅ À faire

- [x] Initialisation du projet Vite avec pnpm
- [x] Intégration de Tailwind CSS v4
- [ ] Création des composants : Canvas, Toolbar, Perceptron
- [ ] Ajout des fonctionnalités interactives
- [ ] Implémentation de l'algorithme du perceptron
- [ ] Déploiement GitHub Pages
