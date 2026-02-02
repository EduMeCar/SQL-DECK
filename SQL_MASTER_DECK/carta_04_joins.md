# CARTA 04: JOINS 💔

**Nivel:** 🟢 Intro → 🟡 Core  
**Tiempo estimado:** 30-40 min  
**Prerequisito:** Cartas 01-03 (SELECT, WHERE, campos)

---

## 🎯 OBJETIVO

Conectar múltiples tablas relacionadas para responder preguntas complejas. JOINS es el "pegamento" que une información distribuida en varias tablas.

---

## 🎯 LO ESENCIAL QUE DEBES SABER

**El mundo real NO vive en una sola tabla.** Tienes usuarios, transacciones, empresas, productos: todo separado. JOINS te permite responder preguntas que cruzan esa información.

👉 Una consulta SELECT hasta ahora era de UNA tabla  
👉 JOINs conectan DOS O MÁS tablas por una clave común (como company_id)  
👉 El JOIN más común es INNER JOIN (solo registros que coinciden en ambas tablas)

**¿Por qué importa?** Sin JOINs, solo puedes ver datos aislados. Con JOINs, ves la historia completa: "qué transacciones hizo cada empresa", "qué compras hizo cada usuario", etc.

---

## 💻 LA CONSULTA BASE

```sql
SELECT tabla1.columna, tabla2.columna
FROM tabla1
INNER JOIN tabla2 ON tabla1.id = tabla2.tabla1_id;
```

**Desglose:**
- `FROM tabla1` → Tabla principal
- `INNER JOIN tabla2` → Conecta tabla2
- `ON tabla1.id = tabla2.tabla1_id` → La condición de conexión ("la clave que tienen en común")

---

## 🚀 VARIANTES EN PROGRESO

### Variante 1: INNER JOIN (lo más común)
```sql
SELECT c.company_name, t.amount
FROM company c
INNER JOIN transactions t ON c.id = t.company_id;
```
*Solo transacciones de empresas que existen*

### Variante 2: LEFT JOIN (preserva tabla izquierda)
```sql
SELECT c.company_name, t.amount
FROM company c
LEFT JOIN transactions t ON c.id = t.company_id;
```
*Todas las empresas, aunque NO tengan transacciones*

### Variante 3: JOIN con filtros
```sql
SELECT c.company_name, t.amount
FROM company c
INNER JOIN transactions t ON c.id = t.company_id
WHERE t.amount > 1000;
```
*Empresas con transacciones mayores a 1000*

### Variante 4: Múltiples JOINs (3 tablas)
```sql
SELECT u.name, c.company_name, t.amount
FROM users u
INNER JOIN transactions t ON u.id = t.user_id
INNER JOIN company c ON t.company_id = c.id;
```
*Usuario → Transacción → Empresa (historia completa)*

---

## 📚 EJERCICIOS (4 progresivos)

### Ejercicio 1: INNER JOIN simple
**Pregunta:** Obtén el nombre de cada empresa Y el monto de sus transacciones.

```sql
SELECT c.company_name, t.amount
FROM company c
INNER JOIN transactions t ON c.id = t.company_id;
```

**Qué observas:** Ves el nombre de la empresa junto al monto. Ya no están separados.

---

### Ejercicio 2: INNER JOIN con WHERE
**Pregunta:** Muestra empresas y sus transacciones, pero solo las mayores a 500.

```sql
SELECT c.company_name, t.amount, t.transaction_date
FROM company c
INNER JOIN transactions t ON c.id = t.company_id
WHERE t.amount > 500;
```

**Qué observas:** Combinas JOIN + WHERE. Perfecto.

---

### Ejercicio 3: LEFT JOIN (incluir datos sin match)
**Pregunta:** Quiero VER todas las empresas, aunque algunas NO tengan transacciones.

```sql
SELECT c.company_name, t.amount
FROM company c
LEFT JOIN transactions t ON c.id = t.company_id;
```

**Qué observas:** Las empresas sin transacciones aparecen con `NULL` en la columna de monto. INNER JOIN las hubiera ocultado.

---

### Ejercicio 4: Múltiples JOINs (historia completa)
**Pregunta:** Para cada transacción, muestra: usuario, empresa, monto.

```sql
SELECT u.name, c.company_name, t.amount
FROM transactions t
INNER JOIN users u ON t.user_id = u.id
INNER JOIN company c ON t.company_id = c.id;
```

**Qué observas:** Tres tablas conectadas. Ahora tienes el "full story".

---

## 💡 TIPS & ERRORES COMUNES

### ✅ Haz esto:
- **Usa alias cortos:** `FROM company c` es más legible que escribir `company` cada vez
- **Cualifica columnas:** `c.company_name` (no solo `company_name`) evita confusión
- **ON vs WHERE:**
  - `ON` es para la condición de JOIN (cómo conectar)
  - `WHERE` es para filtrar después
- **Entiende el tipo de JOIN:**
  - `INNER` = Solo matches
  - `LEFT` = Todos de la tabla izquierda + matches
  - `RIGHT` = Todos de la tabla derecha + matches
  - `FULL` = Todos de ambas tablas
- **Empieza simple:** 2 tablas, luego 3, luego más

### ❌ Evita esto:
- **Olvidar el ON:** `FROM company c INNER JOIN transactions t;` ❌ → Necesitas la condición de JOIN
- **Confundir ON y WHERE:** `FROM c WHERE c.id = t.company_id` ❌ → Usa `ON` en JOINs
- **No cualificar columnas:** Si existen en ambas tablas, SQL se confunde
- **Asumir INNER si no especificas:** El comportamiento varía según BD. Siempre especifica `INNER`, `LEFT`, etc.
- **JOINs sin verificar claves:** Primero explora las tablas con `SELECT *` para ver qué columnas son las claves

---

## 🔗 PRÓXIMO PASO

**Carta 05: Agrupaciones (GROUP BY)** → Ya sabes conectar tablas. Ahora aprende a AGRUPAR los resultados ("cuantas transacciones por empresa", "gasto total por usuario", etc.)

[← Volver al Índice](./INDICE_PRINCIPAL.md) | [Carta 05: Agrupaciones →](./carta_05_agrupaciones.md)
