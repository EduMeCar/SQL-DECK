# 🚀 DOCUSAURUS EN 5 MINUTOS

**TL;DR:** Sigue estos 7 comandos en terminal para tener tu SQL-DECK como WEB:

```bash
# 1. Clona y entra al repo
git clone https://github.com/EduMeCar/SQL-DECK.git
cd SQL-DECK

# 2. Crea sitio Docusaurus
npx create-docusaurus@latest website classic
cd website

# 3. Copia tus cartas
cp -r ../SQL_MASTER_DECK/*.md docs/

# 4. Reemplaza docusaurus.config.js (ver SETUP_DOCOSAURUS.md)
# 5. Reemplaza sidebars.js (ver SETUP_DOCOSAURUS.md)

# 6. Prueba localmente
npm start
# Abre http://localhost:3000/SQL-DECK/

# 7. Deploy a GitHub Pages
npm run build
git add . && git commit -m 'Deploy' && git push origin main
```

**Luego:** Ve a `Settings > Pages` y selecciona **Branch: gh-pages**

**Resultado:** https://edumecar.github.io/SQL-DECK/ 🎉

---

**Para instrucciones COMPLETAS:** Ver `SETUP_DOCOSAURUS.md`
