# 🧠 CARTA 10: ANÁLISIS BUSINESS 🎯
## 🎯 Objetivo
Aprender a transformar datos en decisiones de negocio usando SQL para métricas empresariales clave.

## 📌 Lo esencial que debes saber
El análisis business convierte datos crudos en información accionable.
Con SQL puedes obtener los indicadores que los equipos ejecutivos necesitan para:

- 📈 medir crecimiento,
- 🧭 entender comportamiento de clientes,
- 💰 tomar decisiones estratégicas.

👉 Esta carta da vida real a tu modelo dimensional.

📊 Tablas de ejemplo (continuamos con tu modelo)
🔹 Hechos: facts_transactions
```sql
transaction_id | company_id | date_id | amount | status    | user_id
1              | 1          | 1       | 1208   | approved  | 101
2              | 2          | 2       | 800    | approved  | 102
3              | 1          | 3       | 2500   | pending   | 101
4              | 1          | 4       | 1800   | approved  | 103
5              | 3          | 5       | 500    | approved  | 104
```
🔸 Dimensión: dim_company
```sql
company_id | company_name | country | industry     | employee_size
1          | TechCorp     | USA     | Technology   | 150
2          | DataSystems  | Germany | Data Analytics | 80
3          | StartUpWX    | France  | Startup      | 10
```
🔸 Dimensión: dim_time
```sql
date_id | date       | month | year | quarter
1       | 2024-01-15 | 1     | 2024 | 1
2       | 2024-01-16 | 1     | 2024 | 1
3       | 2024-01-17 | 1     | 2024 | 1
4       | 2024-01-18 | 1     | 2024 | 1
5       | 2024-01-19 | 1     | 2024 | 1
```
🔸 Dimensión: dim_users
```sql
user_id | user_name | country | signup_date
101     | Ana       | Spain   | 2023-12-01
102     | Carlos    | Mexico  | 2024-01-10
103     | Beatriz   | USA     | 2024-01-15
104     | David     | France  | 2024-01-12
```
💰 Métricas de negocio esenciales
📈 Ingresos Mensuales (MRR - Monthly Recurring Revenue)
```sql
SELECT 
    dt.year,
    dt.month,
    SUM(ft.amount) AS ingresos_mensuales
FROM facts_transactions ft
JOIN dim_time dt ON ft.date_id = dt.date_id
WHERE ft.status = 'approved'
GROUP BY dt.year, dt.month
ORDER BY dt.year, dt.month;
```
👥 Clientes Activos por Mes (Active Customers)
```sql
SELECT 
    dt.year,
    dt.month,
    COUNT(DISTINCT ft.company_id) AS clientes_activos
FROM facts_transactions ft
JOIN dim_time dt ON ft.date_id = dt.date_id
WHERE ft.status = 'approved'
GROUP BY dt.year, dt.month
ORDER BY dt.year, dt.month;
```
📊 Ticket Promedio (Average Order Value)
```sql
SELECT 
    AVG(amount) AS ticket_promedio
FROM facts_transactions
WHERE status = 'approved';
```
🏆 Top Empresas por Ingresos
```sql
SELECT 
    dc.company_name,
    dc.industry,
    SUM(ft.amount) AS ingresos_totales
FROM facts_transactions ft
JOIN dim_company dc ON ft.company_id = dc.company_id
WHERE ft.status = 'approved'
GROUP BY dc.company_name, dc.industry
ORDER BY ingresos_totales DESC
LIMIT 10;
```
🎯 Análisis avanzados de negocio
📈 Crecimiento Mensual (Month-over-Month Growth)
```sql
WITH monthly_revenue AS (
    SELECT 
        dt.year,
        dt.month,
        SUM(ft.amount) AS revenue
    FROM facts_transactions ft
    JOIN dim_time dt ON ft.date_id = dt.date_id
    WHERE ft.status = 'approved'
    GROUP BY dt.year, dt.month
)
SELECT 
    year,
    month,
    revenue,
    LAG(revenue) OVER (ORDER BY year, month) AS previous_month_revenue,
    ROUND(
        (revenue - LAG(revenue) OVER (ORDER BY year, month)) / 
        LAG(revenue) OVER (ORDER BY year, month) * 100, 2
    ) AS growth_percentage
FROM monthly_revenue
ORDER BY year, month;
```
🎯 Análisis de Cohort (Retención de Clientes)
```sql
WITH cohort_table AS (
    SELECT 
        dc.company_id,
        DATE_TRUNC('month', MIN(dt.date)) AS cohort_month,
        DATE_TRUNC('month', dt.date) AS order_month,
        COUNT(DISTINCT ft.transaction_id) AS transactions
    FROM facts_transactions ft
    JOIN dim_company dc ON ft.company_id = dc.company_id
    JOIN dim_time dt ON ft.date_id = dt.date_id
    WHERE ft.status = 'approved'
    GROUP BY dc.company_id, cohort_month, order_month
)
SELECT 
    cohort_month,
    order_month,
    COUNT(DISTINCT company_id) AS active_companies,
    ROUND(
        COUNT(DISTINCT company_id) * 100.0 / 
        FIRST_VALUE(COUNT(DISTINCT company_id)) OVER (PARTITION BY cohort_month ORDER BY order_month),
        2
    ) AS retention_rate
FROM cohort_table
GROUP BY cohort_month, order_month
ORDER BY cohort_month, order_month;
```
📊 Distribución de Ingresos por Industria
```sql
SELECT 
    dc.industry,
    COUNT(DISTINCT ft.company_id) AS total_empresas,
    SUM(ft.amount) AS ingresos_totales,
    ROUND(SUM(ft.amount) * 100.0 / (SELECT SUM(amount) FROM facts_transactions WHERE status = 'approved'), 2) AS porcentaje_total
FROM facts_transactions ft
JOIN dim_company dc ON ft.company_id = dc.company_id
WHERE ft.status = 'approved'
GROUP BY dc.industry
ORDER BY ingresos_totales DESC;
```
🔍 Métricas de Performance
📉 Tasa de Conversión por País
```sql
SELECT 
    dc.country,
    COUNT(*) AS total_transacciones,
    COUNT(CASE WHEN ft.status = 'approved' THEN 1 END) AS transacciones_aprobadas,
    ROUND(
        COUNT(CASE WHEN ft.status = 'approved' THEN 1 END) * 100.0 / COUNT(*), 
        2
    ) AS tasa_conversion
FROM facts_transactions ft
JOIN dim_company dc ON ft.company_id = dc.company_id
GROUP BY dc.country
ORDER BY tasa_conversion DESC;
```
⏱️ Velocidad de Transacciones (Primera vs Última)
```sql
WITH transaction_timing AS (
    SELECT 
        company_id,
        MIN(dt.date) AS primera_transaccion,
        MAX(dt.date) AS ultima_transaccion,
        COUNT(*) AS total_transacciones
    FROM facts_transactions ft
    JOIN dim_time dt ON ft.date_id = dt.date_id
    WHERE ft.status = 'approved'
    GROUP BY company_id
    HAVING COUNT(*) > 1
)
SELECT 
    dc.company_name,
    primera_transaccion,
    ultima_transaccion,
    ultima_transaccion - primera_transaccion AS tiempo_activo,
    total_transacciones
FROM transaction_timing tt
JOIN dim_company dc ON tt.company_id = dc.company_id
ORDER BY tiempo_activo DESC;
```
##💡 Consejo Millonario
"Siempre comienza con la pregunta de negocio, no con los datos. Pregunta '¿Qué necesitamos saber para tomar mejores decisiones?' y luego busca los datos que respondan eso."

## 🧭 Guía rápida para análisis business
📈 Métricas básicas que todo negocio necesita:
```sql
Ingresos: SUM(amount) WHERE status = 'approved'
Clientes activos: COUNT(DISTINCT company_id)
Ticket promedio: AVG(amount)
Tasa de conversión: (approved / total) * 100
```

🔍 Análisis avanzados:
```sql
Crecimiento mensual: Usa LAG() para comparar con mes anterior
Análisis cohort: Agrupa por periodo de ingreso y mide retención
Segmentación: Agrupa por industria, país, tamaño
```
📊 Para presentar a ejecutivos:
```sql
Siempre incluye porcentajes junto a números absolutos
Usa ORDER BY para destacar lo más importante
Incluye tendencias (crecimiento, comparativas)
```
## 🏁 Tu nuevo superpoder:

✅ Calcular métricas de negocio clave en minutos
✅ Identificar tendencias y oportunidades de crecimiento
✅ Segmentar clientes por valor y comportamiento
✅ Medir performance comercial y operativa
✅ Tomar decisiones basadas en datos, no en intuiciones


[← Carta 09: Modelado Dimensional](carta_09_modelado.md) | [📚 Ir al Índice](INDICE_PRINCIPAL.md) | [Carta 11: Técnicas Avanzadas →](carta_11_tecnicas_avanzadas.md)