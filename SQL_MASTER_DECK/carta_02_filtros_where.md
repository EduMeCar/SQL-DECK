# CARTA 02: FILTROS WHERE 🎯

**Nivel:** 🟢 Intro  
**Tiempo estimado:** 20-25 min  
**Prerequisito:** Carta 01 (SELECT básico)

---

## 🎯 OBJETIVO

Aprender a filtrar datos con precisión quirúrgica. WHERE es tu herramienta para transformar "todos los datos" en "solo los que importan".

---

## 🎯 LO ESENCIAL QUE DEBES SABER

**WHERE es el filtro más poderoso de SQL.** Se aplica DESPUÉS de FROM para seleccionar filas según condiciones lógicas.

👉 Orden correcto: SELECT ... FROM tabla **WHERE condición**  
👉 Un filtro bien escrito = precisiones + rendimiento + claridad  
👉 Puedes combinar múltiples condiciones con AND/OR

**¿Por qué importa?** Porque "todos los datos" es abrumador. WHERE te permite enfocarte en lo que realmente necesitas. En Carta 01 viste TODO, ahora aprendes a decir "solo lo importante".

---

## 💻 LA CONSULTA BASE

```sql
SELECT * FROM tabla WHERE condición;
```

**Desglose:**
- `WHERE` → "Con esta condición"
- `condición` → Expresión booleana (TRUE o FALSE)
- Solo devuelve filas donde la condición es TRUE

---

## 🚀 VARIANTES EN PROGRESO

### Variante 1: Filtro por igualdad (valor exacto)
```sql
SELECT * FROM users WHERE country = 'Mexico';
```

### Variante 2: Filtro por comparación (mayor/menor)
```sql
SELECT * FROM transactions WHERE amount > 1000;
```

### Variante 3: Filtro por rango (BETWEEN)
```sql
SELECT * FROM transactions WHERE amount BETWEEN 500 AND 2000;
```

### Variante 4: Filtro por lista (IN)
```sql
SELECT * FROM company WHERE country IN ('Mexico', 'Spain', 'Argentina');
```

---

## 📚 EJERCICIOS (4 progresivos)

### Ejercicio 1: Filtro simple por igualdad
**Pregunta:** Encuentra todos los usuarios de México.

```sql
SELECT * FROM users WHERE country = 'Mexico';
```

**Qué observas:** Ahora solo ves usuarios de México, no todos los usuarios.

---

### Ejercicio 2: Filtro por comparación
**Pregunta:** Busca transacciones mayores a 1000 (dinero importante).

```sql
SELECT * FROM transactions WHERE amount > 1000;
```

**Qué observas:** Solo ves transacciones "grandes", eliminaste el ruido de montos pequeños.

---

### Ejercicio 3: Filtro por rango
**Pregunta:** Encuentra transacciones entre 500 y 2000 (rango medio).

```sql
SELECT * FROM transactions WHERE amount BETWEEN 500 AND 2000;
```

**Qué observas:** BETWEEN es más legible que `amount >= 500 AND amount <= 2000`.

---

### Ejercicio 4: Combinando filtros (AND)
**Pregunta:** Encuentra transacciones mayores a 1000 Y de la empresa 'b-2354'.

```sql
SELECT * FROM transactions WHERE amount > 1000 AND company_id = 'b-2354';
```

**Qué observas:** AND significa "ambas condiciones deben ser verdaderas".

---

## 💡 TIPS & ERRORES COMUNES

### ✅ Haz esto:
- Usa `=` para igualdad (no `==` como en programación)
- Pon texto entre comillas: `WHERE country = 'Mexico'` ✅
- Combina filtros con AND (ambos) u OR (cualquiera):
  ```sql
  WHERE amount > 1000 AND country = 'Spain'
  WHERE status = 'active' OR status = 'pending'
  ```
- Usa BETWEEN para rangos: más legible
- Usa IN para listas: `WHERE id IN ('a', 'b', 'c')`

### ❌ Evita esto:
- **Olvidar comillas en texto:** `WHERE country = Mexico` ❌ → `WHERE country = 'Mexico'` ✅
- **Confundir = y ==:** SQL usa `=`, no `==`
- **Filtrar sin ver datos:** Primero SELECT *, luego filtra
- **AND vs OR confundido:** AND = ambas, OR = cualquiera
- **WHERE sin columna:** `WHERE = 'Mexico'` ❌ → `WHERE country = 'Mexico'` ✅

---

## 🔗 PRÓXIMO PASO

**Carta 03: Selección de campos** → Ahora que sabes filtrar TODO, aprende a seleccionar solo las COLUMNAS que necesitas (no `SELECT *`, sino campos específicos)

[← Volver al Índice](./INDICE_PRINCIPAL.md) | [Carta 03: Selección de campos →](./carta_03_seleccion_campos.md)
