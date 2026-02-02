# CARTA 05: AGRUPACIONES (GROUP BY) 📏

**Nivel:** 🟡 Core  
**Tiempo estimado:** 30-35 min  
**Prerequisito:** Cartas 01-04 (SELECT, WHERE, campos, JOINS)

---

## 🎯 OBJETIVO

Transformar datos detallados en información resumida. Aprende a agrupar datos y calcular métricas: totales, promedios, conteos, máximo, mínimo.

---

## 🎯 LO ESENCIAL QUE DEBES SABER

**GROUP BY convierte millones de filas en resumen útil.** Sin GROUP BY, ves cada transacción individual. Con GROUP BY, ves "gasto total por empresa", "transacciones por mes", "promedio de compra por cliente".

👉 `GROUP BY` colapsa filas por uno o más campos (dimensión)  
👉 Las funciones de agregación calculan sobre cada grupo: SUM, AVG, COUNT, MIN, MAX  
👉 `WHERE` filtra ANTES de agrupar; `HAVING` filtra grupos YA formados

**¿Por qué importa?** Los reportes, dashboards, y KPIs viven aquí. Sin GROUP BY, solo ves datos sin sentido. Con GROUP BY, ves patrones, tendencias, oportunidades.

---

## 💻 LA CONSULTA BASE

```sql
SELECT columna_agrupacion, SUM(columna_numerica) as total
FROM tabla
GROUP BY columna_agrupacion;
```

**Desglose:**
- `SELECT columna_agrupacion` → Por qué agrupas (dimensión)
- `SUM(columna_numerica)` → Qué calculas (métrica)
- `GROUP BY columna_agrupacion` → Agrupa por este campo

---

## 🚀 VARIANTES EN PROGRESO

### Variante 1: COUNT (contar registros)
```sql
SELECT company_name, COUNT(*) as num_transacciones
FROM company c
JOIN transactions t ON c.id = t.company_id
GROUP BY company_name;
```

### Variante 2: SUM (total)
```sql
SELECT company_name, SUM(amount) as gasto_total
FROM company c
JOIN transactions t ON c.id = t.company_id
GROUP BY company_name;
```

### Variante 3: AVG, MIN, MAX
```sql
SELECT company_name,
  AVG(amount) as promedio,
  MIN(amount) as minimo,
  MAX(amount) as maximo
FROM company c
JOIN transactions t ON c.id = t.company_id
GROUP BY company_name;
```

### Variante 4: Múltiples agrupaciones
```sql
SELECT company_name, country, COUNT(*) as total
FROM company
GROUP BY company_name, country;
```

---

## 📚 EJERCICIOS (4 progresivos)

### Ejercicio 1: COUNT simple
**Pregunta:** ¿Cuántas transacciones tiene cada empresa?

```sql
SELECT company_name, COUNT(*) as num_transacciones
FROM company c
JOIN transactions t ON c.id = t.company_id
GROUP BY company_name;
```

**Qué observas:** De "miles de transacciones" a "4 empresas con X transacciones cada una".

---

### Ejercicio 2: SUM (total de dinero)
**Pregunta:** ¿Cuál es el gasto total por empresa?

```sql
SELECT company_name, SUM(amount) as gasto_total
FROM company c
JOIN transactions t ON c.id = t.company_id
GROUP BY company_name;
```

**Qué observas:** Ves el dinero real que movió cada empresa.

---

### Ejercicio 3: Múltiples métricas
**Pregunta:** Para cada empresa: cuántas transacciones, gasto total, promedio por transacción.

```sql
SELECT company_name,
  COUNT(*) as cantidad,
  SUM(amount) as total,
  AVG(amount) as promedio
FROM company c
JOIN transactions t ON c.id = t.company_id
GROUP BY company_name;
```

**Qué observas:** Dashboard completo de cada empresa. Ahora ves historia completa.

---

### Ejercicio 4: HAVING (filtrar después de agrupar)
**Pregunta:** Muestra solo empresas con gasto total > 10000.

```sql
SELECT company_name, SUM(amount) as gasto_total
FROM company c
JOIN transactions t ON c.id = t.company_id
GROUP BY company_name
HAVING SUM(amount) > 10000;
```

**Qué observas:** HAVING filtra después de agrupar (diferente a WHERE que filtra antes).

---

## 💡 TIPS & ERRORES COMUNES

### ✅ Haz esto:
- **Siempre entiende dimensión vs métrica:**
  - Dimensión = cómo agrupas (empresa, país, mes)
  - Métrica = qué calculas (SUM, COUNT, AVG)
- **WHERE antes, HAVING después:**
  ```sql
  WHERE amount > 100        -- Filtra filas individuales
  GROUP BY company_name
  HAVING COUNT(*) > 5       -- Filtra grupos
  ```
- **Incluye en SELECT solo lo que agrupes o agregues:**
  ```sql
  SELECT company_name, SUM(amount)
  FROM company c
  GROUP BY company_name     -- Coinciden
  ```
- **Usa alias con AS para claridad:**
  ```sql
  SELECT company_name, COUNT(*) as total_transacciones
  ```

### ❌ Evita esto:
- **Olvidar GROUP BY:** `SELECT company_name, COUNT(*) FROM company;` ❌ → Necesita GROUP BY
- **Incluir columnas no agrupadas:** `SELECT company_name, id, SUM(amount)` ❌ → Si agrupo por company_name, no puedo ver id
- **Confundir WHERE y HAVING:** WHERE es para filas, HAVING para grupos
- **Calcular sin función:** `SELECT company_name, amount` ❌ → Esto NO agrupa, solo devuelve
- **Agrupar por alias:** `SELECT company_id as id GROUP BY id` ❌ → Usa el nombre original

---

## 🔗 PRÓXIMO PASO

**Carta 06: Subconsultas** → Ya agrupas datos. Ahora aprende a usar los resultados de UNA consulta dentro de OTRA (queries dentro de queries).

[← Volver al Índice](./INDICE_PRINCIPAL.md) | [Carta 06: Subconsultas →](./carta_06_subconsultas.md)
