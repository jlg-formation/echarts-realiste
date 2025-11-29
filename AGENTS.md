1. Le projet utilise `bun`. Ne pas utiliser `npm` mais `bun`.
2. Ne pas lancer `bun run dev` car il est déjà lancé sur le port TCP 5173
3. Ne pas essayer d'ouvrir l'url `http://localhost:5173` car l'utilisateur y a déjà accès dans son navigateur.
4. Le projet doit être formatté avec prettier et sa commande `bun format`
5. Les pages du site doivent être dans `/src/pages`
6. Le projet doit utiliser tailwind et le moins possible de CSS natif
7. Utiliser le conventional commit
