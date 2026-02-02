# CARTA 08: VISTAS (VIEWS) 👀

**Nivel:** 🟡 Core  
**Tiempo estimado:** 20-25 min  
**Prerequisito:** Cartas 01-07 (SELECT completo)

---

## 🎯 OBJETIVO

Guardar consultas complejas como "tablas virtuales" reutilizables. Las vistas simplifican consultas frecuentes.

---

## 🎯 LO ESENCIAL QUE DEBES SABER

**Una vista es una consulta guardada que actúa como una tabla.** En lugar de repetir la misma consulta, la ejecutas como si fuera una tabla normal.

👉 `CREATE VIEW nombre AS SELECT ...;`  
👉 Luego: `SELECT * FROM nombre;` (como una tabla normal)  
👉 Reutilizable, fácil de mantener

**¿Por qué importa?** Consultas complejas se vuelven invisibles. Las vistas las documentan y reutilizan.

---

## 💻 LA CONSULTA BASE

```sql
CREATE VIEW nombre_vista AS
SELECT columna1, columna2
FROM tabla
WHERE condición;
```

---

## 🚀 VARIANTES EN PROGRESO

### Variante 1: Vista simple
```sql
CREATE VIEW spanish_companies AS
SELECT * FROM company WHERE country = 'Spain';
```

### Variante 2: Vista con JOIN + GROUP BY
```sql
CREATE VIEW company_totals AS
SELECT c.company_name, COUNT(*) as total
FROM company c
JOIN transactions t ON c.id = t.company_id
GROUP BY c.company_name;
```

---

## 📚 EJERCICIOS (3 progresivos)

### Ejercicio 1: Crear vista simple
```sql
CREATE VIEW approved_transactions AS
SELECT * FROM transactions WHERE status = 'approved';
```

### Ejercicio 2: Vista con métricas
```sql
CREATE VIEW company_metrics AS
SELECT company_name, AVG(amount) as avg, COUNT(*) as total
FROM company c
JOIN transactions t ON c.id = t.company_id
GROUP BY company_name;
```

### Ejercicio 3: Usar la vista
```sql
SELECT * FROM company_metrics WHERE avg > 500;
```

---

## 💡 TIPS & ERRORES COMUNES

### ✅ Haz esto:
- Nombra vistas claramente
- Documenta qué hace cada vista
- Borra vistas viejas: `DROP VIEW nombre;`
- Usa vistas para consultas frecuentes

### ❌ Evita esto:
- Vistas anidadas (demasiada complejidad)
- Vistas que cambian constantemente

---

## 🔗 PRÓXIMO PASO

**Carta 09: Modelado de datos** → Estructura, claves primarias, relaciones.

[← Volver al Índice](./INDICE_PRINCIPAL.md) | [Carta 09: Modelado →](./carta_09_modelado.md)
