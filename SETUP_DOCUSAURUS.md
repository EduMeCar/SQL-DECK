# 📚 SETUP DOCUSAURUS: Convierte SQL-DECK en una WEB PROFESIONAL en 15 minutos

**Objetivo:** Crear un sitio web dinámico, bonito y profesional para SQL-DECK usando Docusaurus + GitHub Pages.

**Resultado:** https://edumecar.github.io/SQL-DECK/ (accesible para todos)

---

## 🚀 PASO A PASO (Sigue exactamente)

### **PASO 1: Prepara tu máquina (5 minutos)**

Abra tu terminal (Mac/Linux: Terminal | Windows: PowerShell)

#### 1.1 Verifica que tienes Node.js instalado

```bash
node --version
npm --version
```

**Si no está instalado:**
- Descarga desde https://nodejs.org/
- Instala la versión LTS (recomendada)
- Reinicia terminal
- Vuelve a verificar

#### 1.2 Clona tu repositorio SQL-DECK

```bash
git clone https://github.com/EduMeCar/SQL-DECK.git
cd SQL-DECK
```

---

### **PASO 2: Crea el proyecto Docusaurus (3 minutos)**

```bash
npx create-docusaurus@latest website classic --typescript
```

**Preguntas que hace:**
- "Project name?" → Presiona Enter (deja "website")
- "Skip install?"→ Escribe `N` y presiona Enter

Espera a que termine (instala todas las dependencias).

---

### **PASO 3: Copia tus cartas al sitio web (2 minutos)**

#### 3.1 Entra a la carpeta website

```bash
cd website
```

#### 3.2 Copia tus cartas

```bash
# Copia todas las cartas a la carpeta docs
cp -r ../SQL_MASTER_DECK/*.md docs/

# (Si estás en Windows, usa esto en lugar de cp):
# xcopy .\SQL_MASTER_DECK\*.md .\docs\ /Y
```

---

### **PASO 4: Configura Docusaurus (3 minutos)**

Abra el archivo `docusaurus.config.js` y reemplaza TODO el contenido con esto:

```javascript
const config = {
  title: 'SQL-DECK 🃏',
  tagline: 'Domina SQL desde cero en 4 horas',
  favicon: 'img/favicon.ico',
  url: 'https://edumecar.github.io',
  baseUrl: '/SQL-DECK/',
  organizationName: 'EduMeCar',
  projectName: 'SQL-DECK',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'es',
    locales: ['es'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'SQL-DECK',
      logo: {
        alt: 'SQL-DECK Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: '📚 Cartas',
        },
        {
          href: 'https://github.com/EduMeCar/SQL-DECK',
          label: '🐙 GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Inicio',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub Discussions',
              href: 'https://github.com/EduMeCar/SQL-DECK/discussions',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} SQL-DECK. Hecho con ❤️`,
    },
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
  },
};

module.exports = config;
```

---

### **PASO 5: Configura la barra lateral (2 minutos)**

Abra `sidebars.js` y reemplaza con esto:

```javascript
const sidebars = {
  tutorialSidebar: [
    {
      type: 'category',
      label: '🟢 Nivel Intro',
      items: [
        'carta_01_select_basico',
        'carta_02_filtros_where',
        'carta_03_seleccion_campos',
        'carta_04_joins',
      ],
    },
    {
      type: 'category',
      label: '🟡 Nivel Core',
      items: [
        'carta_05_agrupaciones',
        'carta_06_subconsultas',
        'carta_07_operaciones',
        'carta_08_vistas',
        'carta_09_modelado',
      ],
    },
    {
      type: 'category',
      label: '🔴 Nivel Pro',
      items: [
        'carta_10_analisis',
      ],
    },
  ],
};

module.exports = sidebars;
```

---

### **PASO 6: Prueba localmente (1 minuto)**

```bash
npm start
```

Espera a que compile. Luego abre tu navegador a: **http://localhost:3000/SQL-DECK/**

**¡Deberías ver tu sitio web con las 10 cartas en el sidebar!**

Presiona `Ctrl+C` para parar.

---

### **PASO 7: Deploy a GitHub Pages (2 minutos)**

#### 7.1 Crea rama gh-pages (solo una vez)

```bash
git checkout --orphan gh-pages
git rm -rf .
git commit --allow-empty -m "Initial commit"
git checkout main
```

#### 7.2 Build y deploy

```bash
# Desde carpeta website
npm run build

# Sube a GitHub
git add .
git commit -m "Deploy Docusaurus site"
git push origin main
```

#### 7.3 Configura GitHub Pages

1. Ve a https://github.com/EduMeCar/SQL-DECK/settings/pages
2. En "Source", selecciona **Branch: gh-pages** | Folder: **/ (root)**
3. Click "Save"
4. Espera 2-3 minutos a que compiles
5. ¡Tu sitio estará en: https://edumecar.github.io/SQL-DECK/

---

## ✨ **¿Qué obtienes?**

✅ Sitio web profesional con tema oscuro  
✅ Sidebar con 10 cartas organizadas por niveles  
✅ Búsqueda integrada  
✅ Responsive (móvil + desktop)  
✅ Links a GitHub  
✅ Hosting gratis en GitHub Pages  
✅ Auto-sync con tu repositorio  

---

## 🆘 **Troubleshooting**

### Error: "Node not found"
→ Instala Node.js desde https://nodejs.org/

### Error: "Port 3000 already in use"
```bash
npm start -- --port 3001
```

### Las cartas no aparecen
→ Verifica que `../SQL_MASTER_DECK/*.md` copiaron correctamente:
```bash
ls -la docs/*.md
```

### GitHub Pages no actualiza
→ Espera 5 minutos y limpia cache (Ctrl+Shift+R)

---

## 📚 **Próximos pasos**

- Personaliza `src/css/custom.css` para tu color de marca
- Añade logo en `static/img/logo.svg`
- Crea página de inicio en `docs/intro.md`
- Comparte el link: **https://edumecar.github.io/SQL-DECK/**

---

**¡Listo! Tu SQL-DECK ahora es una PLATAFORMA WEB profesional.** 🚀
