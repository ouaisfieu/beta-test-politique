# Test Politique – Gauche, Droite et au‑delà

Cette petite application Web propose un questionnaire rapide en 15 affirmations pour
vous situer sur plusieurs axes politiques : économique (gauche/droite), social
(progressiste/conservateur), environnemental et national. Elle classe votre
profil en combinant ces axes pour tenter d'identifier la tendance qui vous
ressemble le plus (écologiste, libertaire de gauche/droite, autoritaire,
nationaliste, socialiste, conservateur, etc.).

## Utilisation

1. Ouvrez le fichier `index.html` dans un navigateur Web moderne (aucune
   connexion Internet nécessaire).
2. Répondez à chaque affirmation en sélectionnant l'option qui correspond le
   mieux à votre opinion.
3. Cliquez sur « Voir mes résultats » pour afficher votre score sur chaque
   axe et la catégorie principale proposée.

## Déploiement

Cette application est constituée de fichiers statiques (`index.html`,
`style.css` et `script.js`). Vous pouvez la déposer telle quelle sur un site Web
ou la servir depuis un serveur local. Par exemple, avec Python :

```bash
cd political_test_app
python3 -m http.server 8000
```

Puis ouvrez un navigateur à l'adresse <http://localhost:8000>.

## Sources et inspiration

Les questions couvrent des thèmes identifiés dans des analyses du clivage
gauche/droite et des idéologies politiques contemporaines. Par exemple,
l'importance accordée à l'égalité et à la justice sociale est un marqueur de
gauche alors que la droite privilégie la liberté économique et la hiérarchie
sociale. 

De même, le clivage écologique oppose les
partisans d'une régulation environnementale forte aux défenseurs de la
croissance économique coûte que coûte, et la dimension « nationalisme » distingue
les individus favorables à la coopération internationale de ceux qui prônent
l'autonomie nationale. 

Le modèle adopte également
l'idée que les opinions ne se situent pas toujours sur un simple axe gauche/droite ; des axes
supplémentaires (autoritarisme/libertarianisme, globalisme/nationalisme) sont
nécéssaires pour refléter la pluralité des positions politiques.

> Ce test est uniquement indicatif et ne saurait remplacer une réflexion
> personnelle ou une analyse détaillée de votre situation.

---

