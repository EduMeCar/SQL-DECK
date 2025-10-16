# CARTA 06: SUBCONSULTAS BÁSICAS 🎯
**Objetivo**: Aprender a usar el resultado de una consulta dentro de otra consulta

## 🎯 LO ESENCIAL QUE DEBES SABER
Las subconsultas son como hacer una pregunta dentro de otra pregunta en SQL.
Primero se resuelve la pregunta interna → luego esa respuesta alimenta la consulta principal.

Imagina esto:

“¿Cuál es el promedio de todas las transacciones?” 🧮
“¿Qué empresas pagan más que ese promedio?” 💰

➡️ ¡Eso es exactamente una subconsulta!

## 📊 TUS TABLAS DE SIEMPRE
```sql
-- 🏢 TABLA: company
id | company_name   | country    
1  | TechCorp       | USA        
2  | DataSystems    | Germany    
3  | StartUpWX      | France     

-- 💰 TABLA: transactions
id | company_id | amount | status    
1  | 1          | 1208   | approved  
2  | 2          | 800    | approved  
3  | 1          | 2500   | pending   
4  | 1          | 1800   | approved  
```
💻 LOS 4 TIPOS DE SUBCONSULTAS QUE VAS A USAR
1. SUBCONSULTA QUE DEVUELVE UN SOLO NÚMERO
```sql
-- PREGUNTA: "¿Qué empresas pagan más que el promedio?"
SELECT company_name
FROM company c 
JOIN transactions t ON c.id = t.company_id
WHERE t.amount > (SELECT AVG(amount) FROM transactions);
```
¿Qué está pasando aquí?
➡️ (SELECT AVG(amount) FROM transactions) calcula el promedio (ej. 1302).
Luego la consulta principal muestra solo las transacciones mayores a ese valor.

2. SUBCONSULTA QUE DEVUELVE UNA LISTA
```sql
-- PREGUNTA: "¿Qué transacciones son de empresas alemanas?"
SELECT *
FROM transactions
WHERE company_id IN (
    SELECT id 
    FROM company 
    WHERE country = 'Germany'
);
```
¿Qué está pasando aquí?
(SELECT id FROM company WHERE country = 'Germany') devuelve [2] (solo DataSystems)
WHERE company_id IN [2] busca transacciones donde company_id sea 2
Solo muestra transacciones de empresas alemanas

3. SUBCONSULTA PARA CALCULAR PORCENTAJES
```sql
-- PREGUNTA: "¿Qué porcentaje del total representa cada transacción?"
SELECT 
    id,
    amount,
    (amount / (SELECT SUM(amount) FROM transactions)) * 100 as porcentaje_total
FROM transactions;
```
¿Qué está pasando aquí?
(SELECT SUM(amount) FROM transactions) calcula el total (6308)
Divide cada amount entre 6308 y multiplica por 100
Te muestra el porcentaje que representa cada transacción

4. SUBCONSULTA COMO TABLA TEMPORAL - CON CASE EXPLICADO
-- PREGUNTA: "¿Qué países tienen buen rendimiento?"
```sql
-- PRIMERO: Creamos una tabla temporal con promedios por país
SELECT 
    pais,
    promedio_ventas,
    -- AQUÍ VIENE EL CASE - TE LO EXPLICO:
    CASE 
        WHEN promedio_ventas > 1000 THEN 'BUEN RENDIMIENTO'
        ELSE 'RENDIMIENTO NORMAL'
    END as categoria
FROM (
    -- Esta es la subconsulta que crea la tabla temporal
    SELECT 
        c.country as pais,
        AVG(t.amount) as promedio_ventas
    FROM company c 
    JOIN transactions t ON c.id = t.company_id
    GROUP BY c.country
) as promedios_pais;
```
🧠 ENTENDIENDO CASE - TU NUEVA HERRAMIENTA
¿QUÉ ES CASE?
CASE es como un "SI ENTONCES" en SQL. Te permite crear categorías basadas en condiciones.

¿CUÁNDO USAR CASE?
Usa CASE cuando necesites transformar números en categorías que la gente entienda:

```sql
-- En lugar de mostrar solo números:
-- 1836.00, 800.00

-- Puedes mostrar categorías comprensibles:
-- "BUEN RENDIMIENTO", "RENDIMIENTO NORMAL"
```
LA ESTRUCTURA DE CASE ES SIEMPRE LA MISMA:
```sql
CASE 
    WHEN condición THEN 'lo_que_muestras_si_se_cumple'
    WHEN otra_condición THEN 'otro_valor'
    ELSE 'lo_que_muestras_si_no_se_cumple_nada'
END
EJEMPLOS DE CASE QUE USARÁS:
```
Clasificar transacciones por tamaño:

```sql
SELECT 
    amount,
    CASE 
        WHEN amount > 2000 THEN 'GRANDE'
        WHEN amount > 1000 THEN 'MEDIANA'  
        ELSE 'PEQUEÑA'
    END as tamaño
FROM transactions;
```
Etiquetar estados de transacciones:

```sql
SELECT 
    status,
    CASE status
        WHEN 'approved' THEN '✅ APROBADA'
        WHEN 'pending' THEN '🟡 PENDIENTE'
        ELSE '⚪ OTRO'
    END as estado_visual
FROM transactions;
```
🚀 CÓMO LO USAS EN TUS SPRINTS
EJERCICIO 3.1 DE TU SPRINT 2:
```sql
-- "Empresas con transacciones superiores al promedio"
SELECT DISTINCT c.company_name
FROM company c
JOIN transaction t ON c.id = t.company_id
WHERE t.amount > (SELECT AVG(amount) FROM transaction);

EJERCICIO 3 DE TU SPRINT 2:
```sql
-- "Transacciones de empresas alemanas"
SELECT *
FROM transaction t 
WHERE company_id IN (
    SELECT id 
    FROM company 
    WHERE country = 'Germany'
);
```
🧭 SUBCONSULTAS CORRELACIONADAS (extra)

Una subconsulta correlacionada se evalúa para cada fila de la consulta externa.

Ejemplo:
```sql
>-- Transacciones mayores al promedio de SU PROPIA EMPRESA
SELECT t.id, t.amount
FROM transactions t
WHERE t.amount > (
    SELECT AVG(t2.amount)
    FROM transactions t2
    WHERE t2.company_id = t.company_id
);
```
➡️ Aquí, la subconsulta depende de cada t.company_id.
Esto permite análisis muy precisos por grupo sin usar JOIN ni GROUP BY externo.

🐞 ERRORES FRECUENTES
- ❌ Usar subconsulta sin paréntesis correctamente → 💥 error de sintaxis.
- ❌ Mezclar columnas externas dentro de subconsultas no correlacionadas.
- ❌ No aliasar la tabla derivada (FROM (SELECT ...) AS nombre).
- ❌ Olvidar filtrar → obtienes resultados gigantes e inútiles.

✅ Consejo: escribe la subconsulta primero y pruébala sola.
Si funciona bien, recién ahí la insertas en la consulta principal.

💡 EL CONSEJO MILLONARIO
"Primero resuelve la pregunta pequeña entre paréntesis, luego usa esa respuesta en tu pregunta grande"

TU MÉTODO PARA CUALQUIER SUBCONSULTA:
PASO 1: ESCRIBE LA PREGUNTA PEQUEÑA ENTRE PARÉNTESIS

```sql
(SELECT AVG(amount) FROM transactions)
```
PASO 2: ESCRIBE LA PREGUNTA GRANDE

```sql
SELECT company_name 
FROM company 
JOIN transactions...
WHERE amount > [aquí_va_el_promedio];
```
PASO 3: JÚNTALAS

```sql
SELECT company_name 
FROM company 
JOIN transactions...
WHERE amount > (SELECT AVG(amount) FROM transactions);
```
# ¿CUÁNDO USAR CADA TIPO?
```sql
Usa subconsulta en WHERE cuando:
Necesitas comparar con un número fijo (como el promedio)
Ejemplo: WHERE amount > (SELECT AVG(amount)...)

Usa subconsulta con IN cuando:
Necesitas comparar con una lista de valores
Ejemplo: WHERE company_id IN (SELECT id FROM company...)

Usa subconsulta en SELECT cuando:
Necesitas calcular porcentajes o ratios
Ejemplo: (amount / (SELECT SUM(amount)...))

Usa subconsulta en FROM cuando:
Necesitas trabajar con datos ya procesados
Ejemplo: FROM (SELECT country, AVG(amount)...)
```
✨ TU NUEVO SUPERPODER

Ahora puedes hacer preguntas más inteligentes a tus datos:

✅ “¿Quiénes son mis clientes que pagan más que el promedio?”
✅ “¿Qué transacciones son de empresas específicas?”
✅ “¿Qué porcentaje del total representa cada venta?”
✅ “¿Cómo clasificar empresas por su rendimiento?”

[← Carta 05: GROUP BY y Agregaciones](carta_05_agrupaciones.md) | [📚 Ir al Índice](INDICE_PRINCIPAL.md) | [Carta 07: INSERT, UPDATE, DELETE →](carta_07_operaciones.md)

