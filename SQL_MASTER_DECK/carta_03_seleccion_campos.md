# CARTA 03: SELECCIÓN DE CAMPOS 🎯

**Nivel:** 🟢 Intro  
**Tiempo estimado:** 20-25 min  
**Prerequisito:** Carta 02 (Filtros WHERE)

---

## 🎯 OBJETIVO

Aprender a mostrar SOLO la información que necesitas, ni más ni menos. En Carta 01 viste TODO (SELECT *), en Carta 02 filtraste FILAS. Ahora aprendes a seleccionar solo las COLUMNAS importantes.

---

## 🎯 LO ESENCIAL QUE DEBES SABER

**SELECT * te da TODO, pero a menudo necesitas solo lo esencial.** En lugar de `SELECT *`, especifica los campos: `SELECT id, nombre, email FROM tabla`.

👉 Orden correcto: `SELECT columna1, columna2, ... FROM tabla WHERE ...`  
👉 Consultas más limpias, rápidas y fáciles de leer  
👉 Mejor rendimiento especialmente en bases de datos grandes

**¿Por qué importa?** Porque "todos los datos" es ruido. En reportes, APIs y dashboards, solo necesitas campos relevantes. Esto es la "precisión quirúrgica" final en SELECT.

---

## 💻 LA CONSULTA BASE

```sql
SELECT columna1, columna2, columna3 FROM tabla;
```

**Desglose:**
- `SELECT columna1, columna2, columna3` → Solo estos campos
- Lista separada por comas
- Si quieres TODOS, usa `*` (pero ahora sabes por qué a veces no deberías)

---

## 🚀 VARIANTES EN PROGRESO

### Variante 1: Solo ID y nombre
```sql
SELECT id, name FROM company;
```

### Variante 2: Transacciones: monto y fecha
```sql
SELECT amount, transaction_date FROM transactions;
```

### Variante 3: Seleccionar + Filtrar
```sql
SELECT id, email, country FROM users WHERE country = 'Spain';
```

### Variante 4: Más campos con filtros complejos
```sql
SELECT id, name, amount FROM transactions WHERE amount > 1000 AND status = 'complete';
```

---

## 📚 EJERCICIOS (4 progresivos)

### Ejercicio 1: Seleccionar campos básicos
**Pregunta:** Obtén SOLO el id y nombre de todas las empresas (no el país ni otros detalles).

```sql
SELECT id, name FROM company;
```

**Qué observas:** Más limpio que `SELECT *`. La tabla es más legible con solo 2 columnas.

---

### Ejercicio 2: Múltiples campos relevantes
**Pregunta:** De los usuarios, quiero SOLO email y país (para contacto y localización).

```sql
SELECT email, country FROM users;
```

**Qué observas:** Ahora el dataset está optimizado para tu propósito específ ico.

---

### Ejercicio 3: Selección + Filtrado (combinando Cartas 02 y 03)
**Pregunta:** Obtén el monto y fecha de las transacciones mayores a 1000.

```sql
SELECT amount, transaction_date FROM transactions WHERE amount > 1000;
```

**Qué observas:** Perfecta. Solo ves lo que importa: montos grandes y cuándo ocurrieron.

---

### Ejercicio 4: Seleccionar el "full story" (todos los campos que necesitas)
**Pregunta:** Para un reporte, necesitas id, nombre y email de usuarios de México.

```sql
SELECT id, name, email FROM users WHERE country = 'Mexico';
```

**Qué observas:** Ahora tienes exactamente lo necesario para un reporte limpio.

---

## 💡 TIPS & ERRORES COMUNES

### ✅ Haz esto:
- Siempre lista los campos que necesitas (mejor que `SELECT *`)
- Usa el mismo orden de campos cada vez para claridad
- Nombra los campos cómo aparecen en la tabla (respeta mayúsculas)
- Combina selección + filtrado para reportes precisos:
  ```sql
  SELECT id, amount, date FROM transactions WHERE amount > 500
  ```
- Si necesitas TODOS los campos, `SELECT *` está bien, pero documenta por qué

### ❌ Evita esto:
- **Typos en nombres de campos:** `SELECT name, emial FROM users` ❌ → Es `email`, no `emial`
- **Olvidar comas entre campos:** `SELECT id name FROM company` ❌ → `SELECT id, name FROM company` ✅
- **Usar alias sin definir:** Aprenderemos después, pero por ahora, nombres simples
- **Seleccionar campos que no existen:** Comprueba primero con `SELECT *` qué campos tienes

---

## 🔗 PRÓXIMO PASO

**Carta 04: JOINS** → Ahora que dominas SELECT, FROM, WHERE y qué campos mostrar, aprende a CONECTAR dos tablas relacionadas (empresa con transacciones, usuario con compras, etc.)

[← Volver al Índice](./INDICE_PRINCIPAL.md) | [Carta 04: JOINS →](./carta_04_joins.md)
