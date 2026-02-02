# GitHub Pages Deployment Guide 🚀

## Configuración de GitHub Pages para SQL-DECK

Esta guía te ayudará a desplegar SQL-DECK en GitHub Pages con Docosaurus.

## Requisitos Previos

- Node.js v16 o superior
- npm o yarn
- Git configurado
- Un repositorio GitHub

## Paso 1: Configuración del Repositorio

### 1.1 Habilitar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Abre **Settings** → **Pages**
3. En "Source", selecciona **Deploy from a branch**
4. Selecciona rama **main** y carpeta **/root**
5. Guarda los cambios

### 1.2 Configurar el dominio (Opcional)

Si tienes un dominio personalizado:

1. En "Custom domain", ingresa tu dominio
2. GitHub creará un archivo `CNAME` automáticamente
3. Confirma en tu registrador de dominio

## Paso 2: Configuración Local

### 2.1 Clonar el repositorio

```bash
git clone https://github.com/EduMeCar/SQL-DECK.git
cd SQL-DECK
```

### 2.2 Instalar dependencias

```bash
npm install
```

## Paso 3: Construir el sitio

### 3.1 Build para producción

```bash
npm run build
```

Esto creará la carpeta `build/` con el sitio compilado.

### 3.2 Probar localmente (antes de desplegar)

```bash
npm run serve
```

Visita `http://localhost:3000` para verificar.

## Paso 4: Automatización con GitHub Actions (Recomendado)

Para despliegue automático en cada push:

### 4.1 Crear workflow automático

1. En tu repositorio, crea `.github/workflows/deploy.yml`
2. Copia este contenido:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: npm
      
      - name: Install dependencies
        run: npm install
      
      - name: Build Docosaurus
        run: npm run build
      
      - name: Deploy to GitHub Pages
        if: github.ref == 'refs/heads/main'
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
          cname: sql-deck.example.com
```

### 4.2 Activar el workflow

1. Commit y push del archivo `.github/workflows/deploy.yml`
2. GitHub Actions se ejecutará automáticamente
3. Ve a Actions para ver el estado del deployment

## Paso 5: Verificar el Deployment

1. Espera 2-3 minutos después del push
2. Ve a `https://EduMeCar.github.io/SQL-DECK/`
3. Verifica que todo se vea correctamente

## Troubleshooting

### El sitio no aparece

- Verifica que la rama esté configurada correctamente en Settings
- Espera más tiempo (a veces tarda 5-10 minutos)
- Revisa la sección "Deployments" en GitHub

### Errores de build

```bash
# Limpiar caché
npm run clear
npm cache clean --force
npm install
npm run build
```

### Las rutas no funcionan correctamente

Verifica que `baseUrl` en `docosaurus.config.js` sea:
```javascript
baseUrl: '/SQL-DECK/',  // Para EduMeCar.github.io/SQL-DECK
```

## Actualizar el sitio

Cada vez que hagas un push a `main`:

```bash
git add .
git commit -m 'Update SQL-DECK content'
git push origin main
```

El sitio se actualizará automáticamente en 2-5 minutos.

## Recursos Adicionales

- [Docosaurus Docs](https://docosaurus.io/)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [GitHub Actions Docs](https://docs.github.com/en/actions)

---

¡Listo! Tu SQL-DECK estará disponible en GitHub Pages. 🎉
