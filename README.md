# Baztami

Baztami est une application web simple qui permet à chaque utilisateur d’ajouter, suivre et organiser ses revenus et ses dépenses, avec une vue rapide du solde. Elle facilite la maîtrise du budget quotidien et garde toutes les données accessibles et sécurisées.

L'objectif est d'aider les utilisateurs à organiser leur budget, visualiser rapidement leur solde, et prendre de meilleures décisions financières au quotidien.

## Fonctionnalités
- Ajouter des transactions: revenus ou dépenses
- Calcul automatique: revenus, dépenses et solde net
- Organisation simple: description et date par transaction
- Retour visuel clair: cartes colorées et indicateurs
- Stockage local: persistance via `localStorage` (données côté navigateur)

## Aperçu technique
- Front-end statique: `HTML`, `CSS`, `JavaScript` (vanilla)
- Style utilitaire: Tailwind (via CDN)
- Icônes: Font Awesome (CDN) et Lucide (CDN)
- Notifications: SweetAlert2 (CDN)
- Données: stockées dans `localStorage` du navigateur

## Arborescence du projet
```
.
├─ index.html
├─ script/
│  └─ index.js
├─ style/
│  └─ style.css
├─ media/
│  └─ logo.png
└─
   └─ README.txt
```


## Utilisation
- Cliquer sur “Add Transaction”
- Renseigner le montant, le type (Income/Expense), la date et la description
- Valider: la transaction s’ajoute, les totaux et le solde se mettent à jour
- Éditer ou supprimer une transaction depuis sa carte

## Données & confidentialité
- Les données sont sauvegardées localement dans votre navigateur via `localStorage`
- Elles ne sont ni envoyées ni partagées par l’application
- Vider le stockage local du navigateur efface vos transactions


## Contributions
- Forker le repo, créer une branche, proposer une PR
- Garder un code simple, lisible, et cohérent avec l’existant

