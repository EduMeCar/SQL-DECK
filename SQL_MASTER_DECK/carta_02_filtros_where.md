# CARTA 02: FILTROS WHERE 🎯

**Objetivo:** Dominar el arte de filtrar datos con precisión quirúrgica
WHERE es tu herramienta para transformar “todos los datos” en “solo los que importan”.

## 🎯 LO ESENCIAL QUE DEBES SABER

WHERE se aplica después de FROM y antes de ORDER BY o GROUP BY.
Permite seleccionar filas según condiciones lógicas y expresiones booleanas.
👉 Cada filtro bien escrito mejora precisión, rendimiento y claridad.

## 💻 LOS 7 TIPOS DE FILTROS QUE DOMINARÁS

### 1.🎯 FILTRO POR IGUALDAD

```sql
-- Usuarios de un país específico
SELECT * FROM users WHERE country = 'Mexico';

-- Transacciones de una empresa específica  
SELECT * FROM transactions WHERE company_id = 'b-2354';
```

### 2.📊 FILTRO POR COMPARACIÓN

```sql
-- Transacciones mayores a un monto
SELECT * FROM transactions WHERE amount > 1000;

-- Empresas fundadas antes de cierta fecha
SELECT * FROM company WHERE year_founded < 2020;
```

### 3.🪜 FILTRO POR RANGO

```sql
-- Transacciones entre dos montos
SELECT * FROM transactions WHERE amount BETWEEN 500 AND 2000;

-- Empresas con cierto rango de empleados
SELECT * FROM company WHERE employees BETWEEN 50 AND 200;
```

### 4.🔍 FILTRO POR PATRÓN(LIKE)

```sql
-- Empresas cuyo nombre empieza con 'Tech'
SELECT * FROM company WHERE company_name LIKE 'Tech%';

-- Transacciones con ID que contienen '2024'
SELECT * FROM transactions WHERE id LIKE '%2024%';
```

### 5.🧾 FILTRO POR LISTA(IN)

```sql
-- Transacciones con IDs específicos
SELECT * FROM transactions WHERE id IN ('t-125', 't-256', 't-389');

-- Empresas de ciertos países
SELECT * FROM company WHERE country IN ('Mexico', 'Colombia', 'Argentina');
```
### 6.🕳️ FILTROS NEGATIVOS Y NULOS
```sql
-- Excluir países
SELECT * FROM company WHERE country NOT IN ('Mexico', 'Argentina');

-- Excluir patrones
SELECT * FROM company WHERE company_name NOT LIKE '%Test%';

-- Filtrar valores nulos
SELECT * FROM transactions WHERE declined IS NULL;

-- Filtrar valores no nulos
SELECT * FROM transactions WHERE declined IS NOT NULL;
```
### 7. 🗓️ FILTROS CON FECHAS
```sql
-- Transacciones de este año
SELECT * FROM transactions 
WHERE transaction_date >= '2025-01-01';

-- Transacciones del primer trimestre
SELECT * FROM transactions 
WHERE transaction_date BETWEEN '2025-01-01' AND '2025-03-31';
```
⏳ Consejo: INTENTAR usar siempre formato YYYY-MM-DD para evitar errores regionales.

## 🚀 COMBINANDO FILTROS PARA RESULTADOS PRECISOS 🧠

### COMBINACIONES CON AND✨

```sql
-- Transacciones exitosas de una empresa específica
SELECT * FROM transactions 
WHERE company_id = 'b-2354' 
AND declined = false
AND amount > 1000;
```

### COMBINACIONES CON OR🔀

```sql
-- Empresas de México o Colombia
SELECT * FROM company 
WHERE country = 'Mexico' OR country = 'Colombia';
```

### COMBINACIONES MIXTAS🧩

```sql
-- Transacciones de México o Colombia mayores a 5000
SELECT * FROM transactions
WHERE (country = 'Mexico' OR country = 'Colombia')
AND amount > 5000;
```
🧭 Regla de oro: Usa paréntesis siempre que mezcles AND y OR.
Asegura que la lógica sea explícita y no “como lo interprete el motor”.

## 📚 EJERCICIOS PRÁCTICOS CON TUS DATOS

### EJERCICIO 1: FILTRO SIMPLE

```sql
-- Encuentra todas las transacciones de la empresa 'b-2354'
SELECT * FROM transactions WHERE company_id = 'b-2354';
```

### EJERCICIO 2: FILTRO COMBINADO

```sql
-- Encuentra transacciones exitosas mayores a 2000
SELECT * FROM transactions 
WHERE declined = false AND amount > 2000;
```

### EJERCICIO 3: FILTRO CON PATRÓN

```sql
-- Encuentra empresas cuyo nombre contiene 'Tech'
SELECT * FROM company WHERE company_name LIKE '%Tech%';
```

### EJERCICIO 4: FILTRO CON MÚLTIPLES CONDICIONES

```sql
-- Encuentra transacciones de México entre 1000 y 5000 que no fueron rechazadas
SELECT * FROM transactions
WHERE country = 'Mexico'
AND amount BETWEEN 1000 AND 5000
AND declined = false;
```

## 🔍 EJERCICIOS PUENTE (DE SIMPLE A COMPLEJO)

### PUENTE 1: DEL PROMEDIO A LA ACCIÓN

```sql
-- Primero: Calcula el promedio
SELECT AVG(amount) FROM transactions; -- Digamos que es 1500

-- Luego: Filtra arriba del promedio
SELECT * FROM transactions WHERE amount > 1500;

-- Finalmente: Automatízalo
SELECT * FROM transactions 
WHERE amount > (SELECT AVG(amount) FROM transactions);
```

### PUENTE 2: DEBUGGEO EN VIVO

```sql
-- Problema: Esta consulta no funciona ¿por qué?
SELECT * FROM transactions 
WHERE amount > 1000 AND declined = false AND company_id = b-2354;

-- Error: b-2354 necesita comillas por ser texto
-- Solución:
SELECT * FROM transactions 
WHERE amount > 1000 AND declined = false AND company_id = 'b-2354';

-- Regla de oro: Texto siempre entre comillas, números nunca
```

## 💡 EL CONSEJO MILLONARIO: CÓMO PENSAR CUALQUIER WHERE

### 🧠TU PLANTILLA MENTAL PARA RESOLVER DESAFÍOS:

🪐**PASO 1: ESCUCHA LA PREGUNTA**

“¿Qué transacciones son sospechosas?” → filtra por montos anormales, horarios raros
“¿Qué empresas son prometedoras?” → filtra por crecimiento, métricas positivas

🧠**PASO 2: TRADUCE A CONDICIONES**

Toda pregunta se divide en:

- ¿Qué QUIERO ver? (transacciones > promedio)
- ¿Qué NO QUIERO ver? (transacciones rechazadas)
- ¿Qué CONTEXTO importa? (empresas tech, último mes)

**PASO 3: CONSTRUYE POR CAPAS**

Empieza simple y ve agregando:
```sql
1. SELECT * FROM transactions
2. WHERE declined = false
3. AND amount > 1000
4. AND company_id IN (SELECT id FROM company WHERE type = 'tech')
```
**PASO 4: DEBUGGEA SI FALLA**

- ✅ Comillas correctas
- ✅ Paréntesis en OR
- ✅ Nulls considerados
- ✅ Tipos de datos coherentes

## 🧠 EJERCICIO FINAL — FILTRO INTEGRADOR 🧠
🎯 Objetivo: combinar varias técnicas en una sola query
```sql
-- Encuentra todas las transacciones
-- • de empresas Tech
-- • realizadas entre 1000 y 5000 USD
-- • de México o Colombia
-- • sin decline
-- • que tengan fecha posterior a 2025-01-01

SELECT * FROM transactions
WHERE amount BETWEEN 1000 AND 5000
AND declined = false
AND transaction_date > '2025-01-01'
AND (country = 'Mexico' OR country = 'Colombia')
AND company_id IN (
  SELECT id FROM company WHERE company_name LIKE '%Tech%'
);
```

## 🎯 TU NUEVO SUPERPODER

**Ahora no solo sabes escribir WHERE, sino:**
- Uso fluido de WHERE con 7 tipos de filtros
- Combinación de condiciones con AND, OR y paréntesis
- Manejo de NULL, NOT IN, NOT LIKE
- Filtros con fechas en formato correcto
- Debuggeo y corrección de errores comunes
- Capacidad de traducir preguntas en filtros
- Ejercicio integrador completado 🧠

Cada filtro que escribas desde hoy será más preciso, más rápido y más confiable.

**Próximo paso:** En la **Carta 03** aprenderás a seleccionar campos específicos - a transformar "toda la información" en "solo las columnas que importan".

[← Carta 01: SELECT Básico](carta_01_select_basico.md) | [📚 Ir al Índice](INDICE_PRINCIPAL.md) | [Carta 03: Selección de Campos →](carta_03_seleccion_campos.md)