# CARTA 05: GROUP BY Y FUNCIONES DE AGREGACIÓN 🎯

**Objetivo**: Dominar el arte de resumir y analizar datos mediante agrupaciones

## 🎯 LO ESENCIAL QUE DEBES SABER
`GROUP BY` transforma **datos detallados** en **información resumida**.  
Es la herramienta para calcular totales, promedios, contar ocurrencias y convertir millones de filas en KPIs útiles para reportes y dashboards.

- `GROUP BY` **colapsa filas** por una(s) columna(s) (la dimensión) y aplica funciones de agregación (las métricas).
- Usa `WHERE` para filtrar filas **antes** de agrupar; usa `HAVING` para filtrar **grupos** ya formados.
- Piensa: **dimensión** = cómo agrupas (empresa, país, mes). **Métrica** = qué mides (SUM, AVG, COUNT).

---

📊 TABLAS DE EJEMPLO (CONTINUAMOS CON TUS DATOS)
```sql
-- 🏢 TABLA: company
id | company_name   | country    | employees
1  | TechCorp       | USA        | 150
2  | DataSystems    | Germany    | 80
3  | StartUpWX      | France     | 10

-- 💰 TABLA: transactions
id | company_id | amount | status    | timestamp
1  | 1          | 1208   | approved  | 2024-01-15
2  | 2          | 800    | approved  | 2024-01-16
3  | 1          | 2500   | pending   | 2024-01-17
4  | 1          | 1800   | approved  | 2024-01-18
```
💻 LAS 5 FUNCIONES DE AGREGACIÓN QUE DOMINARÁS
1. COUNT() - CONTAR REGISTROS
```sql
-- 📝 Cuántas transacciones tiene cada empresa
-- 💡 Útil para: saber actividad por empresa, identificar empresas inactivas
SELECT c.company_name, COUNT(t.id) as total_transacciones
FROM company c 
LEFT JOIN transactions t ON c.id = t.company_id
GROUP BY c.company_name;
```
📋 RESULTADO:
```sql
company_name |	total_transacciones
TechCorp     |  3
DataSystems	 |  1
StartUpWX	 |  0
```
Uso: actividad, volumen, detectar inactividad (COUNT = 0).

2. SUM() - TOTALIZAR VALORES
```sql
-- 📝 Total de ventas por empresa
-- 💡 Útil para: reportes de ingresos, análisis de performance
SELECT c.company_name, SUM(t.amount) as ventas_totales
FROM company c 
LEFT JOIN transactions t ON c.id = t.company_id
GROUP BY c.company_name;
```
📋 RESULTADO:
```sql
company_name | ventas_totales
TechCorp	 | 5508
DataSystems	 | 800
StartUpWX	 | NULL
```
Nota: SUM sobre NULL devuelve NULL si no hay filas; usa COALESCE(SUM(...), 0) para 0.

3. AVG() - CALCULAR PROMEDIOS
```sql
-- 📝 Promedio de transacciones por empresa
-- 💡 Útil para: entender el ticket promedio, identificar patrones de compra
SELECT c.company_name, AVG(t.amount) as promedio_ventas
FROM company c 
JOIN transactions t ON c.id = t.company_id
GROUP BY c.company_name;
```
📋 RESULTADO:
```sql
company_name | promedio_ventas
TechCorp	 | 1836.00
DataSystems	 | 800.00
```
Cuidado: AVG ignora NULL. Asegúrate de la granularidad adecuada (por ejemplo, filtrar por status si es necesario).

4. MAX() / MIN() - ENCONTRAR EXTREMOS
```sql
-- 📝 Transacción más grande y más pequeña por empresa
-- 💡 Útil para: identificar outliers, entender rango de operaciones
SELECT 
    c.company_name,
    MAX(t.amount) as transaccion_maxima,
    MIN(t.amount) as transaccion_minima
FROM company c 
JOIN transactions t ON c.id = t.company_id
GROUP BY c.company_name;
```
📋 RESULTADO:
```sql
company_name | transaccion_maxima | transaccion_minima
TechCorp	 | 2500	              | 1208
DataSystems	 | 800	              | 800
```
Uso: detectar outliers, límites operativos.

5. COMBINACIÓN MULTIPLE - EL REPORTE DEFINITIVO
```sql
-- 📝 Resumen ejecutivo completo por empresa
-- 💡 Útil para: dashboards, reportes de management, análisis estratégico
SELECT 
    c.company_name,
    c.country,
    COUNT(t.id) as total_transacciones,
    SUM(t.amount) as ventas_totales,
    AVG(t.amount) as promedio_ventas,
    MAX(t.amount) as venta_maxima,
    MIN(t.amount) as venta_minima
FROM company c 
LEFT JOIN transactions t ON c.id = t.company_id
GROUP BY c.company_name, c.country;
```
Práctico para dashboards y reportes de management.

## 🚀 WHERE vs HAVING — La diferencia que cambia todo

- WHERE filtra filas antes del GROUP BY.
- HAVING filtra grupos después de agrupar (usa agregados en la condición).

```sql
-- 📝 Promedio de transacciones APROBADAS por empresa
-- 💡 WHERE se ejecuta ANTES del GROUP BY - filtra transacciones individuales
SELECT c.company_name, AVG(t.amount) as promedio_aprobado
FROM company c 
JOIN transactions t ON c.id = t.company_id
WHERE t.status = 'approved'  -- Solo transacciones aprobadas
GROUP BY c.company_name;
```
HAVING - FILTRAR DESPUÉS DE AGRUPAR (FILTRA GRUPOS COMPLETOS)
```sql
-- 📝 Empresas con promedio de ventas mayor a 1000
-- 💡 HAVING se ejecuta DESPUÉS del GROUP BY - filtra empresas completas
SELECT c.company_name, AVG(t.amount) as promedio_ventas
FROM company c 
JOIN transactions t ON c.id = t.company_id
GROUP BY c.company_name
HAVING AVG(t.amount) > 1000;  -- Solo empresas que cumplan condición
```
**Patrón útil: WHERE para aplicar reglas de negocio a filas; HAVING para reglas a la métrica resultante.**

WHERE + HAVING - COMBINACIÓN PODEROSA
```sql
-- 📝 Empresas con promedio de transacciones APROBADAS mayor a 1500
-- 💡 WHERE filtra transacciones, HAVING filtra empresas resultantes
SELECT c.company_name, AVG(t.amount) as promedio_aprobado
FROM company c 
JOIN transactions t ON c.id = t.company_id
WHERE t.status = 'approved'     -- Primero: solo transacciones aprobadas
GROUP BY c.company_name
HAVING AVG(t.amount) > 1500;   -- Luego: solo empresas con promedio alto
```
🔍 PATRONES AVANZADOS DE TUS SPRINTS
ANÁLISIS POR PAÍS (SPRINT 2 - EJERCICIO 2.2)
```sql
-- 📝 Media de ventas por país - usado en tu Sprint 2
-- 💡 Patrón: Agrupar por dimensión geográfica para análisis regional
SELECT c.country, AVG(t.amount) as avg_amount
FROM company c 
JOIN transaction t ON t.company_id = c.id
GROUP BY c.country
ORDER BY avg_amount DESC;
```
IDENTIFICAR EMPRESAS DESTACADAS (SPRINT 2 - EJERCICIO 3.1)
```sql
-- 📝 Empresas con transacciones sobre el promedio - usado en tu Sprint 2
-- 💡 Patrón: Subconsulta en HAVING para comparar con métricas globales
SELECT c.company_name, AVG(t.amount) as promedio_empresa
FROM company c 
JOIN transactions t ON c.id = t.company_id
GROUP BY c.company_name
HAVING AVG(t.amount) > (SELECT AVG(amount) FROM transactions);
```
ANÁLISIS TEMPORAL (PATRÓN PARA FUTUROS SPRINTS)
```sql
-- 📝 Ventas totales por mes - preparación para análisis temporal
-- 💡 Patrón: GROUP BY con funciones de fecha para análisis temporal
SELECT 
    YEAR(timestamp) as año,
    MONTH(timestamp) as mes,
    SUM(amount) as ventas_totales
FROM transactions
GROUP BY YEAR(timestamp), MONTH(timestamp)
ORDER BY año, mes;
```
🎯 PREGUNTAS TÍPICAS DE "PROFE" (EXTRAÍDAS DE TUS SPRINTS)
PREGUNTA 1:
"¿Cuál es la empresa con el mayor promedio de ventas por transacción?"
```sql
-- Tu respuesta debería ser:
SELECT c.company_name, AVG(t.amount) as promedio_ventas
FROM company c 
JOIN transactions t ON c.id = t.company_id
GROUP BY c.company_name
ORDER BY promedio_ventas DESC
LIMIT 1;
```
PREGUNTA 2:
"¿Qué países tienen más de 3 transacciones en total?"

```sql
-- Tu respuesta debería ser:
SELECT c.country, COUNT(t.id) as total_transacciones
FROM company c 
JOIN transactions t ON c.id = t.company_id
GROUP BY c.country
HAVING COUNT(t.id) > 3;
```
PREGUNTA 3:
"Muestra el total de ventas por empresa, pero solo para empresas con más de 2000 en ventas totales"

```sql
-- Tu respuesta debería ser:
SELECT c.company_name, SUM(t.amount) as ventas_totales
FROM company c 
JOIN transactions t ON c.id = t.company_id
GROUP BY c.company_name
HAVING SUM(t.amount) > 2000;
```
🧰 EXTRAS QUE TE HACEN BRILLAR (práctico + avanzado)
Manejo elegante de NULL:
``` sql
SELECT 
  c.company_name,
  COALESCE(SUM(t.amount), 0) AS ventas_totales,
  COALESCE(AVG(t.amount), 0) AS promedio_ventas
FROM company c 
LEFT JOIN transactions t ON c.id = t.company_id
GROUP BY c.company_name;
```
COALESCE evita NULL y deja 0 cuando no hay datos.

Ordena siempre tus resultados para lectura profesional:
``` sql
SELECT c.company_name, SUM(t.amount) AS ventas_totales
FROM company c 
JOIN transactions t ON c.id = t.company_id
GROUP BY c.company_name
ORDER BY ventas_totales DESC;
``` 
## 🐞 ERRORES FRECUENTES (evítalos así)

- Poner en SELECT columnas no agrupadas ni agregadas → error o resultado indeterminado.
- Usar WHERE para filtrar grupos → convertirás LEFT JOIN en INNER sin querer.
- Olvidar COALESCE → verás NULL donde esperas 0.
- No ordenar los resultados → malas decisiones por datos sin jerarquía visual.

💡 EL CONSEJO MILLONARIO
"WHERE filtra filas individuales ANTES de agrupar, HAVING filtra grupos completos DESPUÉS de agrupar - esta diferencia es la clave para reportes precisos"

TU PLANTILLA MENTAL PARA CUALQUIER GROUP BY:

PASO 1: IDENTIFICA LA DIMENSIÓN DE ANÁLISIS
```SQL
¿Por empresa? → GROUP BY company_name
¿Por país? → GROUP BY country
¿Por fecha? → GROUP BY DATE(timestamp)
¿Por estado? → GROUP BY status
```
PASO 2: SELECCIONA LAS MÉTRICAS CLAVE
```SQL
¿Volumen? → COUNT()
¿Ingresos? → SUM()
¿Eficiencia? → AVG()
¿Rango? → MAX()/MIN()
```
PASO 3: APLICA FILTROS ESTRATÉGICOS
```SQL
¿Filtrar datos crudos? → WHERE (ej: solo transacciones aprobadas)
¿Filtrar resultados? → HAVING (ej: solo empresas con ventas > X)
```
PASO 4: CONSTRUYE POR CAPAS - EJEMPLO REAL

```sql
-- Capa 1: Datos base
SELECT company_name, amount, status
FROM company JOIN transactions...

-- Capa 2: Agregación básica  
SELECT company_name, COUNT(*), AVG(amount)
FROM ... GROUP BY company_name

-- Capa 3: Filtros estratégicos
SELECT company_name, COUNT(*), AVG(amount)
FROM company JOIN transactions 
WHERE status = 'approved'        -- filtro individual
GROUP BY company_name
HAVING AVG(amount) > 1000        -- filtro grupal
```
🎯 TU NUEVO SUPERPODER
Ahora puedes transformar millones de filas en insights accionables:

✅ Reportes ejecutivos en segundos
✅ Identificar patrones y tendencias ocultas
✅ Detectar empresas destacadas y problemáticas
✅ Preparar datos para dashboards y presentaciones
✅ Responder preguntas complejas de negocio

Cada GROUP BY que escribas revelará información estratégica escondida en tus datos.

[← Carta 04: JOINS entre Tablas](carta_04_joins.md) | [📚 Ir al Índice](INDICE_PRINCIPAL.md) | [Carta 06: Subconsultas →](carta_06_subconsultas.md)



