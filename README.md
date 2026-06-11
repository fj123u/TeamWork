# TeamWork

Mini Reseau Social Etudiant developpe en HTML / CSS / JavaScript.

## Description

TeamWork est une plateforme sociale etudiante permettant aux utilisateurs de creer un compte, se connecter, gerer leur profil, publier des messages, interagir avec les contenus et rechercher des publications. Les donnees sont conservees dans le navigateur grace a localStorage.

## Fonctionnalites

- Inscription avec photo de profil (avatar par defaut si aucune image)
- Connexion avec validation des identifiants
- Profil utilisateur modifiable (nom, prenom, email, mot de passe, photo)
- Fil d'actualite avec publications
- Publications avec titre, message, image et date
- Systeme de likes
- Commentaires sur les publications
- Suppression de ses propres publications
- Recherche de publications par contenu ou par auteur
- Filtre par auteur avec compteur de resultats
- Follow / Unfollow d'utilisateurs
- Priorite aux publications des utilisateurs suivis
- Tableau de bord avec statistiques (posts, likes, commentaires, followers)
- Deconnexion

## Structure du projet

```
TeamWork/
├── main/
│   ├── main.html        (page d'accueil)
│   └── main.css
├── signin/
│   ├── signin.html      (connexion)
│   ├── signin.css
│   └── signin.js
├── signup/
│   ├── signup.html      (inscription)
│   ├── signup.css
│   └── signup.js
├── homepage/
│   ├── homepage.html    (fil d'actualite)
│   ├── homepage.css
│   └── homepage.js
├── profile/
│   ├── profile.html     (profil utilisateur)
│   ├── profile.css
│   └── profile.js
├── img/                 (images et assets)
└── utility/             (documents du projet)
```

## Technologies

- HTML5
- CSS3
- JavaScript (vanilla)
- localStorage / JSON

## Lancement

Ouvrir le fichier `main/main.html` dans un navigateur web.

## Parcours utilisateur

1. Acceder a la page d'accueil
2. Creer un compte ou se connecter
3. Consulter son profil
4. Acceder au fil d'actualite
5. Publier un message (avec ou sans image)
6. Rechercher des publications
7. Suivre d'autres utilisateurs
8. Interagir (likes, commentaires)
9. Se deconnecter
