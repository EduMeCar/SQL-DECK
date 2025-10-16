# 🧠 CARTA 11: TÉCNICAS AVANZADAS 🎯

## 🎯 Objetivo  
Dominar técnicas SQL avanzadas para resolver problemas complejos y optimizar tu análisis de datos.

---

## 📌 Lo esencial que debes saber  
Estas técnicas te separan de los usuarios básicos de SQL. Te permiten resolver problemas que parecen imposibles con consultas tradicionales.

---

## 📊 Tablas de ejemplo  
Continuamos con tu modelo base:
```SQL
**Hechos: facts_transactions**  
transaction_id | company_id | date_id | amount | status   | user_id | product_id  
1              | 1          | 1       | 1208   | approved | 101     | 201  
2              | 2          | 2       | 800    | approved | 102     | 202  
3              | 1          | 3       | 2500   | pending  | 101     | 201  
4              | 1          | 4       | 1800   | approved | 103     | 203  
5              | 3          | 5       | 500    | approved | 104     | 202  
6              | 2          | 6       | 3200   | approved | 105     | 204  
```
**Dimensión: dim_products**  
```SQL
product_id | product_name  | category | price  
201        | Laptop Pro    | Hardware | 1500  
202        | DataSuite     | Software | 800  
203        | Cloud Storage | Service  | 200  
204        | AI Module     | AI       | 1200  
```
---

## 🚀 Técnicas avanzadas que dominarás  

### 🔄 CTEs (Common Table Expressions) — Consultas organizadas  
**Problema:** Consultas complejas difíciles de leer y mantener  
**Solución:** Usar CTEs para dividir y conquistar  
```SQL
WITH  
ventas_por_empresa AS (  
 SELECT company_id, SUM(amount) AS ventas_totales  
 FROM facts_transactions  
 WHERE status = 'approved'  
 GROUP BY company_id  
),  
empresas_con_alto_rendimiento AS (  
 SELECT company_id  
 FROM ventas_por_empresa  
 WHERE ventas_totales > 2000  
)  
SELECT dc.company_name, vpe.ventas_totales  
FROM empresas_con_alto_rendimiento ecar  
JOIN ventas_por_empresa vpe ON ecar.company_id = vpe.company_id  
JOIN dim_company dc ON ecar.company_id = dc.company_id;

---
```
### 📊 Funciones de Ventana (Window Functions) — Análisis en contexto  

**Ranking de empresas por ventas:**  
```SQL
SELECT dc.company_name,  
 SUM(ft.amount) AS ventas_totales,  
 RANK() OVER (ORDER BY SUM(ft.amount) DESC) AS ranking_ventas,  
 PERCENT_RANK() OVER (ORDER BY SUM(ft.amount) DESC) AS percentil  
FROM facts_transactions ft  
JOIN dim_company dc ON ft.company_id = dc.company_id  
WHERE ft.status = 'approved'  
GROUP BY dc.company_name;
```
**Ventas acumuladas por mes:**  
```SQL
SELECT dt.date, dt.month,  
 SUM(ft.amount) AS ventas_dia,  
 SUM(SUM(ft.amount)) OVER (PARTITION BY dt.year, dt.month ORDER BY dt.date ROWS UNBOUNDED PRECEDING) AS ventas_acumuladas_mes  
FROM facts_transactions ft  
JOIN dim_time dt ON ft.date_id = dt.date_id  
WHERE ft.status = 'approved'  
GROUP BY dt.date, dt.month, dt.year  
ORDER BY dt.date;

---
```
### 🔍 Análisis de Lag y Lead — Comparar periodos  

**Crecimiento día a día:**  
```SQL
WITH ventas_diarias AS (  
 SELECT dt.date, SUM(ft.amount) AS ventas_dia  
 FROM facts_transactions ft  
 JOIN dim_time dt ON ft.date_id = dt.date_id  
 WHERE ft.status = 'approved'  
 GROUP BY dt.date  
)  
SELECT date, ventas_dia,  
 LAG(ventas_dia) OVER (ORDER BY date) AS ventas_ayer,  
 ROUND((ventas_dia - LAG(ventas_dia) OVER (ORDER BY date)) / LAG(ventas_dia) OVER (ORDER BY date) * 100, 2) AS crecimiento_porcentual  
FROM ventas_diarias  
ORDER BY date;

---
```
### 🎯 Funciones de Agregación Condicional — Análisis segmentado  

**Ventas por categoría de producto:**  
```SQL
SELECT dc.company_name,  
 COUNT(*) AS total_transacciones,  
 COUNT(CASE WHEN dp.category = 'Hardware' THEN 1 END) AS transacciones_hardware,  
 COUNT(CASE WHEN dp.category = 'Software' THEN 1 END) AS transacciones_software,  
 SUM(CASE WHEN dp.category = 'Hardware' THEN ft.amount ELSE 0 END) AS ventas_hardware,  
 SUM(CASE WHEN dp.category = 'Software' THEN ft.amount ELSE 0 END) AS ventas_software  
FROM facts_transactions ft  
JOIN dim_company dc ON ft.company_id = dc.company_id  
JOIN dim_products dp ON ft.product_id = dp.product_id  
WHERE ft.status = 'approved'  
GROUP BY dc.company_name;

---
```
### 🔄 Recursive CTEs — Jerarquías y secuencias  

**Generar serie de fechas (para completar gaps):**  
```SQL
WITH RECURSIVE date_series AS (  
 SELECT '2024-01-01' AS date  
 UNION ALL  
 SELECT date + INTERVAL 1 DAY  
 FROM date_series  
 WHERE date < '2024-01-31'  
)  
SELECT ds.date,  
 COALESCE(SUM(ft.amount), 0) AS ventas_dia  
FROM date_series ds  
LEFT JOIN dim_time dt ON ds.date = dt.date  
LEFT JOIN facts_transactions ft ON dt.date_id = ft.date_id AND ft.status = 'approved'  
GROUP BY ds.date  
ORDER BY ds.date;

---
```
### 🎪 Pivot Tables con CASE — Datos en formato matriz  

**Ventas mensuales por categoría:**  
```SQL
SELECT dt.month, dt.year,  
 SUM(CASE WHEN dp.category = 'Hardware' THEN ft.amount ELSE 0 END) AS hardware,  
 SUM(CASE WHEN dp.category = 'Software' THEN ft.amount ELSE 0 END) AS software,  
 SUM(CASE WHEN dp.category = 'Service' THEN ft.amount ELSE 0 END) AS service,  
 SUM(CASE WHEN dp.category = 'AI' THEN ft.amount ELSE 0 END) AS ai  
FROM facts_transactions ft  
JOIN dim_time dt ON ft.date_id = dt.date_id  
JOIN dim_products dp ON ft.product_id = dp.product_id  
WHERE ft.status = 'approved'  
GROUP BY dt.year, dt.month  
ORDER BY dt.year, dt.month;

---
```
## 💡 Técnicas de Optimización Avanzada  

### 🚀 Índices Parciales para consultas frecuentes  
Solo indexar transacciones aprobadas (más pequeñas y frecuentes):  
```SQL
CREATE INDEX idx_transactions_approved ON facts_transactions(company_id, date_id)  
WHERE status = 'approved';

---
```
### 🔍 Partitioning para tablas muy grandes  
Particionar por mes (ideal para datos históricos):  
```SQL
CREATE TABLE facts_transactions (  
 transaction_id INT,  
 company_id INT,  
 date_id INT,  
 amount DECIMAL(10,2),  
 status VARCHAR(20)  
) PARTITION BY RANGE (date_id);  

CREATE TABLE transactions_2024_01 PARTITION OF facts_transactions  
FOR VALUES FROM (1) TO (31);

---
```
### 📝 Materialized Views para cálculos pesados  
Vista materializada para reportes diarios:  
```SQL
CREATE MATERIALIZED VIEW mv_daily_sales AS  
SELECT dt.date, dc.company_name, dp.category,  
 SUM(ft.amount) AS daily_sales, COUNT(*) AS transaction_count  
FROM facts_transactions ft  
JOIN dim_time dt ON ft.date_id = dt.date_id  
JOIN dim_company dc ON ft.company_id = dc.company_id  
JOIN dim_products dp ON ft.product_id = dp.product_id  
WHERE ft.status = 'approved'  
GROUP BY dt.date, dc.company_name, dp.category;  

REFRESH MATERIALIZED VIEW mv_daily_sales;

---
```
## 🎯 Casos de uso del mundo real  

### 🔍 Identificar patrones de compra recurrentes  
```SQL
WITH customer_sequences AS (  
 SELECT company_id, date,  
  LAG(date) OVER (PARTITION BY company_id ORDER BY date) AS previous_purchase,  
  date - LAG(date) OVER (PARTITION BY company_id ORDER BY date) AS days_between  
 FROM facts_transactions ft  
 JOIN dim_time dt ON ft.date_id = dt.date_id  
 WHERE status = 'approved'  
)  
SELECT dc.company_name,  
 ROUND(AVG(days_between), 2) AS avg_days_between_purchases,  
 COUNT(*) AS total_purchases  
FROM customer_sequences cs  
JOIN dim_company dc ON cs.company_id = dc.company_id  
WHERE days_between IS NOT NULL  
GROUP BY dc.company_name  
HAVING COUNT(*) > 1  
ORDER BY avg_days_between_purchases;

---
```
### 📈 Análisis de cohort avanzado con funciones de ventana  
```SQL
WITH cohort_data AS (  
 SELECT company_id,  
  DATE_TRUNC('month', MIN(dt.date)) AS cohort_month,  
  DATE_TRUNC('month', dt.date) AS order_month,  
  EXTRACT(MONTH FROM AGE(dt.date, MIN(dt.date) OVER (PARTITION BY company_id))) AS months_since_first  
 FROM facts_transactions ft  
 JOIN dim_time dt ON ft.date_id = dt.date_id  
 WHERE status = 'approved'  
)  
SELECT cohort_month, months_since_first,  
 COUNT(DISTINCT company_id) AS active_companies,  
 ROUND(COUNT(DISTINCT company_id) * 100.0 / FIRST_VALUE(COUNT(DISTINCT company_id)) OVER (PARTITION BY cohort_month ORDER BY months_since_first), 2) AS retention_rate  
FROM cohort_data  
GROUP BY cohort_month, months_since_first  
ORDER BY cohort_month, months_since_first;

---
```
## 💡 Consejo Millonario  
“Domina las funciones de ventana — son la herramienta más poderosa para análisis avanzado. Te permiten hacer en una consulta lo que antes requería docenas de líneas de código.”

---

## 🧭 Guía rápida para técnicas avanzadas  

📊 **Cuándo usar cada técnica:**  
- **CTEs:** Consultas complejas que necesitan dividirse en partes lógicas  
- **Funciones de Ventana:** Rankings, acumulados o comparaciones entre filas  
- **LAG/LEAD:** Análisis de tendencias y crecimiento periodo a periodo  
- **Agregación Condicional:** Segmentación avanzada en una sola consulta  
- **CTEs Recursivas:** Jerarquías, secuencias o completar datos faltantes  
- **Pivot Tables:** Presentar datos en formato matriz para reportes  

⚡ **Optimización para grandes volúmenes:**  
- **Índices Parciales:** Cuando solo consultas un subconjunto de datos frecuentemente  
- **Particionado:** Tablas con millones de registros consultadas por rangos  
- **Vistas Materializadas:** Cálculos complejos que no cambian frecuentemente  

---

## 🏁 Tu nuevo superpoder  
✅ Resolver problemas de análisis complejos en una sola consulta  
✅ Optimizar el rendimiento de bases de datos grandes  
✅ Crear reportes ejecutivos sofisticados y automatizados  
✅ Analizar tendencias y patrones ocultos en los datos  
✅ Trabajar eficientemente con millones de registros  

---

[← Carta 10: Análisis](carta_10_analisis.md) | [📚 Ir al Índice](INDICE_PRINCIPAL.md) | [Carta 12: Proyecto Final →](carta_12_proyecto_final.md)
