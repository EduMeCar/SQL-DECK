# CARTA 06: SUBCONSULTAS 🎲

**Nivel:** 🟡 Core  
**Tiempo estimado:** 35-40 min  
**Prerequisito:** Cartas 01-05 (SELECT completo, GROUP BY)

---

## 🎯 OBJETIVO

Aprender a usar el resultado de UNA consulta dentro de OTRA. Las subconsultas permiten resolver problemas más complejos descomponiéndolos en pasos.

---

## 🎯 LO ESENCIAL QUE DEBES SABER

**Una subconsulta es una consulta dentro de otra consulta.** La consulta interna se resuelve primero, luego su resultado alimenta la consulta externa.

👉 Subconsulta en WHERE: `SELECT * FROM tabla WHERE id IN (SELECT ...)`  
👉 Subconsulta en FROM: `SELECT * FROM (SELECT ...) as subconsulta`  
👉 Subconsulta en SELECT: `SELECT (SELECT COUNT(*) FROM ...) as total`

**¿Por qué importa?** Algunas preguntas no se pueden responder con una sola consulta. Las subconsultas son el "método de división y conquista" de SQL.

---

## 💻 LA CONSULTA BASE

```sql
SELECT *
FROM tabla
WHERE columna IN (SELECT columna FROM otra_tabla WHERE condición);
```

**Desglose:**
- Subconsulta interior (en paréntesis) se resuelve primero
- Su resultado se usa en la consulta exterior
- IN compara si un valor está en la lista de resultados

---

## 🚀 VARIANTES EN PROGRESO

### Variante 1: Subconsulta en WHERE con IN
```sql
SELECT company_name, amount
FROM transactions
WHERE company_id IN (SELECT id FROM company WHERE country = 'Spain');
```

### Variante 2: Subconsulta en WHERE con ANY/ALL
```sql
SELECT company_name
FROM company
WHERE employees > (SELECT AVG(employees) FROM company);
```

### Variante 3: Subconsulta en FROM
```sql
SELECT *
FROM (SELECT company_name, COUNT(*) as total FROM transactions GROUP BY company_name) as resumen
WHERE total > 5;
```

### Variante 4: Subconsulta correlacionada
```sql
SELECT c.company_name, (SELECT COUNT(*) FROM transactions t WHERE t.company_id = c.id) as total_trans
FROM company c;
```

---

## 📚 EJERCICIOS (3 progresivos)

### Ejercicio 1: Subconsulta simple con IN
**Pregunta:** Encuentra empresas españolas que tengan transacciones.

```sql
SELECT DISTINCT company_name
FROM transactions
WHERE company_id IN (SELECT id FROM company WHERE country = 'Spain');
```

### Ejercicio 2: Subconsulta con comparación
**Pregunta:** Empresas con más empleados que el promedio.

```sql
SELECT company_name, employees
FROM company
WHERE employees > (SELECT AVG(employees) FROM company)
ORDER BY employees DESC;
```

### Ejercicio 3: Subconsulta en FROM
**Pregunta:** Muestra el resumen de transacciones, pero solo empresas con > 10 transacciones.

```sql
SELECT company_name, total
FROM (SELECT company_name, COUNT(*) as total FROM transactions t JOIN company c ON t.company_id = c.id GROUP BY company_name) as resumen
WHERE total > 10;
```

---

## 💡 TIPS & ERRORES COMUNES

### ✅ Haz esto:
- Primero prueba la subconsulta SOLA, luego intégrala
- Usa alias claros en subconsultas en FROM
- Indenta subconsultas para claridad
- In: `WHERE id IN (...)` para múltiples valores
- Comparación: `WHERE cantidad > (SELECT ...)` para un solo valor

### ❌ Evita esto:
- **Subconsultas ineficientes:** Pueden ser lentas. Considera JOINs como alternativa
- **Subconsultas sin alias en FROM:** `FROM (SELECT ...) WHERE ...` ❌ → Necesita AS nombre
- **Devolver más de una fila en WHERE:** `WHERE id = (SELECT ...)` ❌ → Si devuelve varios, usa IN
- **Olvidar paréntesis:** La sintaxis es cruc ial

---

## 🔗 PRÓXIMO PASO

**Carta 07: Operaciones avanzadas** → UNION, EXCEPT, INTERSECT, y más técnicas de combinación de resultados.

[← Volver al Índice](./INDICE_PRINCIPAL.md) | [Carta 07: Operaciones avanzadas →](./carta_07_operaciones.md)
