# CARTA 01: SELECT BÁSICO 🃏

**Nivel:** 🟢 Intro  
**Tiempo estimado:** 15-20 min  
**Prerequisito:** Ninguno - es el inicio

---

## 🎯 OBJETIVO

Sentar las bases sólidas de TODAS las consultas SQL que vendrán. Aprendes a explorar una tabla completa y a entender la estructura de tus datos antes de hacer nada más complejo.

---

## 🎯 LO ESENCIAL QUE DEBES SABER

**SELECT \* es tu ventana directa** a toda la información de la base de datos. Es el punto de partida para TODO lo demás que aprenderás: filtros, joins, agrupaciones y más.

👉 Cada consulta SQL, sin importar su complejidad, empieza con una selección de datos.  
👉 "SELECT" significa: "muéstrame esto".  
👉 Por eso es la piedra angular de cualquier análisis.

**¿Por qué importa?** Porque antes de filtrar datos (Carta 02), seleccionar columnas específicas (Carta 03) o unir tablas (Carta 04), necesitas CONOCER qué tienes. SELECT \* te permite ver la estructura completa.

---

## 💻 LA CONSULTA BASE

```sql
SELECT * FROM tabla;
```

**Desglose:**
- `SELECT *` → "Tráeme TODAS las columnas"
- `FROM tabla` → "De esta tabla específica"
- `;` → Fin de instrucción

---

## 🚀 VARIANTES EN PROGRESO

### Variante 1: Explorar todas las empresas
```sql
SELECT * FROM company;
```

### Variante 2: Ver historial completo de transacciones
```sql
SELECT * FROM transactions;
```

### Variante 3: Conocer todos los usuarios (sin límite)
```sql
SELECT * FROM users;
```

---

## 📚 EJERCICIOS (3-4 progresivos)

### Ejercicio 1: Exploración básica
**Pregunta:** Escribe una consulta que te muestre TODA la estructura de la tabla `company`.

```sql
SELECT * FROM company;
```

**Qué observas:** Verás todas las columnas que tiene la tabla (id, nombre, país, empleados, etc.)

---

### Ejercicio 2: Comprensión de estructura
**Pregunta:** ¿Qué campos tiene la tabla `transactions`? Escribe la consulta.

```sql
SELECT * FROM transactions;
```

**Qué observas:** Ahora sabes qué información tienes sobre transacciones (id, monto, fecha, empresa_id, etc.)

---

### Ejercicio 3: Preparación para filtros
**Pregunta:** Antes de aprender a filtrar (Carta 02), necesitas ver qué datos tienes en `users`. Escribe la consulta.

```sql
SELECT * FROM users;
```

**Qué observas:** Ya tienes el mapa mental de campos de usuarios para filtrar después.

---

### Ejercicio 4: Puente a JOINs
**Pregunta:** ¿Qué tablas necesitarás conectar después? Visualiza ambas con dos consultas separadas.

```sql
SELECT * FROM company;
SELECT * FROM transactions;
```

**Qué observas:** Ya ves cómo `company` (id) se podría conectar con `transactions` (company_id). Esto es lo que aprenderás en Carta 04.

---

## 💡 TIPS & ERRORES COMUNES

### ✅ Haz esto:
- Siempre empieza con `SELECT *` antes de hacer nada más complejo
- Usa `;` al final de cada consulta (es obligatorio en muchas BD)
- Si la tabla es muy grande, añade `LIMIT 10` para no saturarte:
  ```sql
  SELECT * FROM transactions LIMIT 10;
  ```
- Prueba con tablas pequeñas primero (`company` vs `transactions`)

### ❌ Evita esto:
- **Olvidar `FROM`**: `SELECT * company;` ❌ → Necesita: `SELECT * FROM company;` ✅
- **Usar nombres inexactos**: `SELECT * FROM companies;` puede fallar si la tabla se llama `company`
- **Olvidar el punto y coma**: Algunas herramientas funcionan sin él, pero es mala práctica
- **SELECT sin FROM**: `SELECT *;` ❌ → Necesita una tabla origen

---

## 🔗 PRÓXIMO PASO

**Carta 02: Filtros WHERE** → Aprenderás a decir "muéstrame TODO, PERO solo los que cumplen esta condición"

[← Volver al Índice](./INDICE_PRINCIPAL.md) | [Carta 02: Filtros WHERE →](./carta_02_filtros_where.md)
