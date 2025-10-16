# CARTA 04: JOINS ENTRE TABLAS 🎯
**Objetivo:** Dominar el arte de conectar información de múltiples tablas

## 🎯 LO ESENCIAL QUE DEBES SABER
JOINS son tu herramienta para transformar "datos aislados" en "información conectada". Son los puentes que unen tablas relacionadas para responder preguntas complejas.

🧠 POR QUÉ ESTO ES TAN IMPORTANTE

Hasta ahora:
```sql
SELECT → mostrabas datos
WHERE → filtrabas filas
Campos → elegías columnas
```
👉 Pero el mundo real no vive en una sola tabla.
Ventas, usuarios, países, productos, transacciones… todo está distribuido.
Los JOINS son el pegamento que permite unir toda esa información en una sola vista lógica.

## 📊 TABLAS DE EJEMPLO
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
4  | NULL       | 1500   | approved
```
📌 Observa que:

company.id se relaciona con transactions.company_id
No todas las transacciones tienen empresa (NULL)
No todas las empresas tienen transacciones (StartUpWX)

💻 LOS 4 TIPOS DE JOINS QUE DOMINARÁS
1. INNER JOIN - SOLO COINCIDENCIAS PERFECTAS

```sql
SELECT c.company_name, t.amount, t.status
FROM company c 
INNER JOIN transactions t ON c.id = t.company_id;
````
📋 RESULTADO:
```sql
company_name | amount | status
TechCorp	 | 1208	  | approved
DataSystems	 | 800	  | approved
TechCorp	 | 2500	  | pending
```
✅ Muestra solo lo que coincide en ambas tablas.
❌ Se pierden empresas sin transacciones y transacciones sin empresa.

2. LEFT JOIN - PROTEGER EMPRESAS
````sql
SELECT c.company_name, t.amount, t.status
FROM company c 
LEFT JOIN transactions t ON c.id = t.company_id;
````
📋 RESULTADO:
```sql
company_name|amount	|status
TechCorp	|1208	|approved
DataSystems	|800	|approved
StartUpWX	|NULL	|NULL
TechCorp	|2500	|pending
```
✅ Todas las empresas aparecen, aunque no tengan transacciones.
🧠 Piensa: “quiero asegurarme de no perder empresas”.

3. RIGHT JOIN - PROTEGER TRANSACCIONES(LA TABLA DE LA DERECHA)

```sql
SELECT c.company_name, t.amount, t.status
FROM company c 
RIGHT JOIN transactions t ON c.id = t.company_id;
```
📋 RESULTADO:
```sql
company_name|amount	|status
TechCorp	|1208	|approved
DataSystems	|800	|approved
TechCorp	|2500	|pending
NULL	    |1500	|approved
```
✅ Todas las transacciones aparecen, aunque no tengan empresa asociada.
🧠 Piensa: “quiero asegurarme de no perder transacciones”.

4. FULL JOIN - PROTEGER TODO

```sql
SELECT c.company_name, t.amount, t.status
FROM company c 
FULL JOIN transactions t ON c.id = t.company_id;
```
📋 RESULTADO:
```sql
company_name|amount	|status
TechCorp	|1208	|approved
DataSystems	|800    |approved
StartUpWX	|NULL	|NULL
TechCorp	|2500	|pending
NULL	    |1500	|approved
```
✅ Combina LEFT y RIGHT → nadie queda fuera.
⚠️ No todos los motores SQL soportan FULL JOIN directamente (por ej. en MySQL se simula con UNION de LEFT + RIGHT).

🧠 CÓMO PENSAR UN JOIN (PLANTILLA MENTAL)
```SQL
Situación	                            JOIN recomendado	    Resultado esperado
Quiero solo coincidencias	            INNER JOIN	            Intersección
Quiero todas las filas de la izquierda	LEFT JOIN	            Izquierda completa
Quiero todas las filas de la derecha	RIGHT JOIN	            Derecha completa
Quiero todo de ambas	                FULL JOIN	            Unión total
```
👉 Repite este cuadro hasta que sea natural.

🚀 COMBINANDO JOINS PARA RESULTADOS PODEROSOS
- JOIN + WHERE → Filtrar después de unir
```sql
-- Empresas alemanas con transacciones aprobadas
SELECT c.company_name, t.amount
FROM company c 
INNER JOIN transactions t ON c.id = t.company_id
WHERE c.country = 'Germany' AND t.status = 'approved';
```
- JOIN + GROUP BY → Agregar información conectada
```sql
-- Total de ventas por empresa
SELECT c.company_name, SUM(t.amount) as total_ventas
FROM company c 
LEFT JOIN transactions t ON c.id = t.company_id
GROUP BY c.company_name;
```
📊 LEFT JOIN aquí es clave para incluir empresas sin ventas → total_ventas será NULL o 0.

## 📚 EJERCICIOS PRÁCTICO
EJERCICIO 1: JOIN BÁSICO
```sql
-- Encuentra todas las empresas con sus transacciones
SELECT c.company_name, t.amount, t.status
FROM company c 
LEFT JOIN transactions t ON c.id = t.company_id;
```
EJERCICIO 2: ANÁLISIS DE BRECHAS
```sql
-- Identifica empresas que no tienen transacciones
SELECT c.company_name
FROM company c 
LEFT JOIN transactions t ON c.id = t.company_id
WHERE t.id IS NULL;
```
EJERCICIO 3: REPORTE EJECUTIVO
```sql
-- Crea un reporte con empresa, país, total transacciones y total ventas
SELECT 
    c.company_name,
    c.country,
    COUNT(t.id) as total_transacciones,
    COALESCE(SUM(t.amount), 0) as total_ventas
FROM company c 
LEFT JOIN transactions t ON c.id = t.company_id
GROUP BY c.company_name, c.country;
````
🐞 ERRORES COMUNES (Y CÓMO EVITARLOS)
- ❌ Olvidar el ON →
```sql 
SELECT * FROM company INNER JOIN transactions;  -- ERROR
```
✅ Siempre especifica cómo se relacionan:
```sql
... INNER JOIN transactions t ON c.id = t.company_id;
```
❌ Usar WHERE en vez de ON (mal en LEFT/RIGHT) →
Puede convertir un LEFT JOIN en INNER sin que lo notes.

✅ Deja la condición de relación en ON y las condiciones de filtro extra en WHERE.

🧠 EXTRA: JOINS EN CADENA (Nivel intermedio)

Puedes unir más de dos tablas en cascada:
```sql
SELECT u.name, c.company_name, t.amount
FROM users u
INNER JOIN company c ON u.company_id = c.id
LEFT JOIN transactions t ON c.id = t.company_id;
```
👉 Ideal cuando tus datos vienen de varias fuentes: usuarios, empresas, transacciones, países, productos, etc.

💡 EL CONSEJO MILLONARIO
“LEFT JOIN = protejo la tabla de la izquierda.
RIGHT JOIN = protejo la tabla de la derecha.
INNER JOIN = no protejo a nadie, solo lo que coincide.
FULL JOIN = protejo a todos.”

Si no sabes cuál usar, pregúntate:
📌 “¿Qué tabla no quiero que pierda información?” → y usa LEFT o RIGHT en consecuencia.

🧠 PATRÓN UNIVERSAL PARA CONSTRUIR UN JOIN
```sql
1. Empieza por la tabla base (la que quieres proteger)
2. Agrega la tabla secundaria con JOIN
3. Especifica la condición con ON
4. Filtra con WHERE si hace falta
5. Agrega cálculos y alias si lo necesitas
6. Agrupa si quieres reportes
```

🎯 TU NUEVO SUPERPODER

✔ Conectas múltiples tablas sin miedo
✔ Sabes cuándo usar INNER, LEFT, RIGHT o FULL
✔ Detectas brechas (datos faltantes)
✔ Construyes reportes ejecutivos desde SQL puro
✔ Preparas consultas listas para análisis real

👉 Próximo paso: Agrupaciones con GROUP BY, donde aprenderás a resumir y contar datos como un analista profesional.

[← Carta 03: Selección de Campos](carta_03_seleccion_campos.md) | [📚 Ir al Índice](INDICE_PRINCIPAL.md) | [Carta 05: Agrupaciones GROUP BY →](carta_05_agrupaciones.md)



