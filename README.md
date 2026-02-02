# SQL-DECK 🃏

**Un mazo de cartas educativas para dominar SQL desde cero, paso a paso.**

> *Convierte SQL de "confuso" a "claro y poderoso" en 4 horas de estudio progresivo.*

---

## ¿Qué es SQL-DECK?

SQL-DECK es un **toolkit educativo abierto** que convierte el aprendizaje de SQL en algo tangible, modular y divertido.

**10 cartas temáticas** (desde SELECT básico hasta análisis de negocio) diseñadas para:
- ✨ Ser **ultra portables**: Markdown, JSON, PDF. Funciona offline.
- 🎯 Tener **progresión clara**: Intro → Core → Pro (15-40 min cada carta).
- 💡 Enseñar el **"por qué"** antes del código.
- 🎮 Incluir **ejercicios reales** en cada carta.
- 🤝 Ser **completamente abiertas**: GPL. Contribuye, adapta, remezcla.

---

## Inicio rápido

### 👀 Ver en 5 minutos

1. Abre [`SQL_MASTER_DECK/INDICE_PRINCIPAL.md`](./SQL_MASTER_DECK/INDICE_PRINCIPAL.md)
2. Haz click en "Carta 01: SELECT BÁSICO"
3. Lee la primera carta (5 min)
4. Ejecuta los ejercicios en tu BD favorita

### 📖 Estudiar completo (3-4 horas)

1. Comienza en **Carta 01** (SELECT básico)
2. Progresa secuencialmente hasta **Carta 10** (Análisis avanzado)
3. Cada carta: lectura + ejercicios + próximo paso enlazado

### 🖨️ Formato físico

- Descarga el [PDF imprimible](./SQL_MASTER_DECK/) y úsalo como handout en clase
- O imprime cada carta individual (4 cartas por página A4)

---

## Las 10 cartas

| # | Carta | Nivel | Tema | Tiempo |
|---|-------|-------|------|--------|
| 1 | [SELECT BÁSICO](./SQL_MASTER_DECK/carta_01_select_basico.md) | 🟢 Intro | Explora tablas | 15 min |
| 2 | [FILTROS WHERE](./SQL_MASTER_DECK/carta_02_filtros_where.md) | 🟢 Intro | Selecciona filas | 20 min |
| 3 | [SELECCIÓN CAMPOS](./SQL_MASTER_DECK/carta_03_seleccion_campos.md) | 🟢 Intro | Elige columnas | 20 min |
| 4 | [JOINS](./SQL_MASTER_DECK/carta_04_joins.md) | 🟢 Intro → 🟡 Core | Conecta tablas | 30 min |
| 5 | [AGRUPACIONES](./SQL_MASTER_DECK/carta_05_agrupaciones.md) | 🟡 Core | GROUP BY, métricas | 30 min |
| 6 | [SUBCONSULTAS](./SQL_MASTER_DECK/carta_06_subconsultas.md) | 🟡 Core | Queries dentro de queries | 35 min |
| 7 | [OPERACIONES AVANZADAS](./SQL_MASTER_DECK/carta_07_operaciones.md) | 🟡 Core | UNION, EXCEPT, INTERSECT | 25 min |
| 8 | [VISTAS](./SQL_MASTER_DECK/carta_08_vistas.md) | 🟡 Core | Tablas virtuales | 20 min |
| 9 | [MODELADO DATOS](./SQL_MASTER_DECK/carta_09_modelado.md) | 🟡 Core | PKs, FKs, relaciones | 25 min |
| 10 | [ANÁLISIS AVANZADO](./SQL_MASTER_DECK/carta_10_analisis.md) | 🔴 Pro | KPIs, métricas negocio | 40 min |

**Total: ~260 minutos (≈4 horas) de contenido bien estructurado.**

---

## Cómo usar SQL-DECK

### 👨‍🎓 Autoestudio (Recomendado)

1. Abre cada carta en orden
2. Lee "Lo esencial que debes saber"
3. Copia la consulta base en tu editor SQL favorito (SQLite, PostgreSQL, MySQL, etc.)
4. Experimenta: modifica valores, añade WHERE, combina con JOINs
5. Resuelve los 3-4 ejercicios de cada carta
6. Pasa a la siguiente

**Tiempo total:** 3-4 horas | **Nivel:** Desde cero

### 👨‍🏫 En clase/Taller (45-90 min)

1. **Intro (5 min):** Explica por qué SQL importa
2. **Cartas 01-03 (30 min):** Live coding + práctica en grupo
3. **Cartas 04-05 (30 min):** JOINs y agregaciones (lo más interesante)
4. **Preguntas abiertas (10 min):** Que practiquen lo aprendido

### 💼 Onboarding empresarial

1. **Semana 1:** Cartas 01-04 (fundamentos)
2. **Semana 2:** Cartas 05-07 (análisis)
3. **Semana 3:** Cartas 08-10 + tu BD real

---

## Características pedagógicas

✅ **Progresión clara:** Cada carta asume lo de la anterior (sin saltos)  
✅ **Objetivos explícitos:** Sabes qué aprenderás en cada carta  
✅ **Ejemplos reales:** Datos de empresa, transacciones, usuarios  
✅ **Ejercicios progresivos:** De básico a puente (hacia siguiente carta)  
✅ **Tips & errores:** Buenas prácticas + trampas comunes  
✅ **Tiempos realistas:** 15-40 min por carta (no abrumador)  
✅ **Sin dependencias:** Markdown/JSON/PDF. Sin software especial  
✅ **Abierto:** GPL. Mejora, adapta, remezcla.  

---

## Herramientas recomendadas

Para practicar SQL-DECK, elige UNA (todas gratis):

- **[SQLite Online](https://sqliteonline.com/)** - Sin instalar, en navegador ⭐ Recomendado para empezar
- **[DB Fiddle](https://www.db-fiddle.com/)** - PostgreSQL, MySQL, SQLite
- **[Kaggle Notebooks](https://kaggle.com/code)** - SQL + Python + datos reales
- **Local:** `sqlite3` (CLI), DBeaver (GUI)

---

## Hoja de ruta (Roadmap)

### v1.0 (Actual) ✅
- ✅ 10 cartas estandarizadas
- ✅ Estructura de progresión clara
- ✅ README atractivo

### v2.0 (Próximo)
- 🔄 Plataforma web interactiva (ejecuta SQL en navegador)
- 🔄 Base de datos precargadas para practicar
- 🔄 Sistema de insignias / progreso visual
- 🔄 Sección "Contribuyentes"

### v3.0 (Futuro)
- 📌 Integraciones con Kaggle / DB Fiddle
- 📌 Generador de nuevas cartas (template)
- 📌 Comunidad abierta de instructores
- 📌 Traducciones (ES, EN, FR, etc.)

---

## Contribuye

¿Quieres mejorar SQL-DECK?

1. **Reporta un error:** Abre un [Issue](https://github.com/EduMeCar/SQL-DECK/issues)
2. **Sugiere una mejora:** Abre un [Discussion](https://github.com/EduMeCar/SQL-DECK/discussions)
3. **Crea una nueva carta:** Ver [`CONTRIBUTING.md`](./CONTRIBUTING.md) (próximamente)

---

## Licencia

SQL-DECK es **abierto bajo GPL 3.0**. Puedes:
- ✅ Usar en clase
- ✅ Modificar para tu contexto
- ✅ Compartir mejoras
- ✅ Vender educación basada en esto (mencionando autoría)

---

## Preguntas frecuentes

**¿Necesito SQL previo?**  
No. Comienza en Carta 01 sin asumir nada.

**¿Funciona con mi BD (PostgreSQL, MySQL, etc.)?**  
Sí. Las queries son estándar SQL. Pequeños cambios de sintaxis en algunas cartas.

**¿Cuánto tiempo toma dominar SQL?**  
Las 10 cartas: 3-4 horas. Fluidez real: 20-30 horas de práctica adicional.

**¿Puedo usar esto en mi empresa?**  
Sí. Es GPL. Mencionanos, y contribuye mejoras de vuelta.

---

## Créditos

**SQL-DECK** es un proyecto de **[EduMeCar](https://github.com/EduMeCar)** hecho con ❤️ para democratizar el acceso a educación SQL.

Inspirado en pedagogía de "learn by doing" y diseño instruccional modular.

---

**¿Listo? [Abre Carta 01](./SQL_MASTER_DECK/INDICE_PRINCIPAL.md) y comienza ahora.** 🚀
