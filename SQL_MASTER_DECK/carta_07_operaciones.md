# CARTA 07: OPERACIONES AVANZADAS (UNION, EXCEPT) 🚀

**Nivel:** 🟡 Core  
**Tiempo estimado:** 25-30 min  
**Prerequisito:** Cartas 01-06 (SELECT completo, subconsultas)

---

## 🎯 OBJETIVO

Aprender a combinar resultados de múltiples consultas: UNION (fusionar), EXCEPT (excluir), INTERSECT (cruce).

---

## 🎯 LO ESENCIAL QUE DEBES SABER

**UNION, EXCEPT, INTERSECT te permiten combinar múltiples conjuntos de resultados.** Son operaciones de conjuntos: reúnen datos de distintas fuentes en un solo resultado.

👉 `UNION`: Fusiona resultados de 2+ consultas (sin duplicados)  
👉 `UNION ALL`: Fusiona con duplicados  
👉 `EXCEPT`: Filas en primera consulta, NO en segunda  
👉 `INTERSECT`: Filas que están en AMBAS consultas

**¿Por qué importa?** A veces necesitas combinar datos de fuentes distintas: usuarios de tabla A + usuarios de tabla B, pero sin duplicar.

---

## 💻 LA CONSULTA BASE

```sql
SELECT columna1, columna2 FROM tabla1
UNION
SELECT columna1, columna2 FROM tabla2;
```

---

## 🚀 VARIANTES EN PROGRESO

### Variante 1: UNION (sin duplicados)
```sql
SELECT name FROM users WHERE country = 'Spain'
UNION
SELECT name FROM customers WHERE country = 'Spain';
```

### Variante 2: UNION ALL (con duplicados)
```sql
SELECT amount FROM transactions WHERE status = 'approved'
UNION ALL
SELECT amount FROM transactions WHERE status = 'pending';
```

### Variante 3: EXCEPT (solo en primera, no en segunda)
```sql
SELECT id FROM users
EXCEPT
SELECT user_id FROM banned_users;
```

### Variante 4: INTERSECT (solo items en ambas)
```sql
SELECT country FROM company WHERE employees > 100
INTERSECT
SELECT country FROM users WHERE verified = TRUE;
```

---

## 📚 EJERCICIOS (3 progresivos)

### Ejercicio 1: UNION básico
**Pregunta:** Lista todas las empresas españolas Y usuarios españoles (combinados).

```sql
SELECT company_name as nombre FROM company WHERE country = 'Spain'
UNION
SELECT user_name FROM users WHERE country = 'Spain';
```

### Ejercicio 2: EXCEPT (excluir)
**Pregunta:** Usuarios que NO están bloqueados.

```sql
SELECT id FROM users
EXCEPT
SELECT user_id FROM blocked_users;
```

### Ejercicio 3: INTERSECT (cruce)
**Pregunta:** Países donde hay empresas Y usuarios.

```sql
SELECT country FROM company
INTERSECT
SELECT country FROM users;
```

---

## 💡 TIPS & ERRORES COMUNES

### ✅ Haz esto:
- Las columnas en UNION deben tener el mismo tipo/orden
- Usa UNION para combinar datos similares
- Usa `ORDER BY` al final para ordenar resultado completo
- Piensa en UNION como "pegamento" entre consultas

### ❌ Evita esto:
- **Columnas diferentes:** `SELECT id, name UNION SELECT amount` ❌
- **Olvidar alias:** Los nombres de columnas vienen de la primera consulta
- **Usar JOIN cuando sea UNION:** No todos los problemas se resuelven igual

---

## 🔗 PRÓXIMO PASO

**Carta 08: Vistas** → Guarda consultas complejas como "tablas virtuales" reutilizables.

[← Volver al Índice](./INDICE_PRINCIPAL.md) | [Carta 08: Vistas →](./carta_08_vistas.md)
