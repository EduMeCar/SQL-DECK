# 🧠 CARTA 09: MODELADO DIMENSIONAL 🎯
## 🎯 Objetivo
Aprender a estructurar tus datos como un profesional para análisis empresarial rápido y poderoso.

## 📌 Lo esencial que debes saber
- 🧮 Hechos (Facts) → Lo que mides (ventas, cantidades, importes)
- 🧭 Dimensiones (Dimensions) → Cómo lo describes (empresa, país, fecha, producto…)

## 📊 Tablas de ejemplo
🔹 Tabla de hechos: transactions (lo que mides)
```sql
id | company_id | amount | status    | timestamp           | currency
1  | 1          | 1208   | approved  | 2024-01-15 10:30:00 | USD
2  | 2          | 800    | approved  | 2024-01-16 14:45:00 | EUR
3  | 1          | 2500   | pending   | 2024-01-17 09:15:00 | USD
4  | 1          | 1800   | approved  | 2024-01-18 16:20:00 | USD
```
🔸 Tablas de dimensiones: company, time, currency (cómo lo describes)
```sql
-- Dimension company
id | company_name   | country    | city       | industry
1  | TechCorp       | USA        | New York   | Technology
2  | DataSystems    | Germany    | Berlin     | Data Analytics
3  | StartUpWX      | France     | Paris      | Startup

-- Dimension time (puedes generarla automáticamente)
date_id | date       | day | month | year | quarter | day_of_week
1       | 2024-01-15 | 15  | 1     | 2024 | 1       | Monday
2       | 2024-01-16 | 16  | 1     | 2024 | 1       | Tuesday

-- Dimension currency
currency_code | currency_name
USD           | US Dollar
EUR           | Euro
```
## 💡 Conceptos clave
# 📈 Tabla de hechos (Facts)
- Contiene los números que quieres analizar (amount, quantity, price)
- Tiene claves foráneas que apuntan a las dimensiones
- Es la tabla más grande - crece rápido

# 📐 Tablas de dimensiones (Dimensions)
- Contienen descripciones para filtrar y agrupar (company_name, country, date)
- Son tablas más pequeñas - crecen lentamente

## 🏗️ Cómo diseñar tu modelo dimensional
1. Identifica el proceso de negocio
¿Qué quieres analizar? → Ventas por empresa, por país, por tiempo

2. Define la granularidad
¿Cada fila representa qué? → Una transacción individual

3. Identifica las dimensiones
¿Cómo quieres cortar los datos? → Por empresa, tiempo, moneda, ubicación

4. Identifica los hechos
¿Qué números quieres sumar/promediar? → Monto de transacción

## 🚀 Ejemplo práctico: Modelo estrella para transactions
🔵 Hechos: facts_transactions
```sql
id | company_id | date_id | currency_code | amount | status
1  | 1          | 1       | USD           | 1208   | approved
2  | 2          | 2       | EUR           | 800    | approved
3  | 1          | 3       | USD           | 2500   | pending
4  | 1          | 4       | USD           | 1800   | approved
```
🟢 Dimensión: dim_company
```sql
company_id | company_name | country | city     | industry
1          | TechCorp     | USA     | New York | Technology
2          | DataSystems  | Germany | Berlin   | Data Analytics
3          | StartUpWX    | France  | Paris    | Startup
```
🟢 Dimensión: dim_time
```sql
date_id | date       | day | month | year | quarter | day_of_week
1       | 2024-01-15 | 15  | 1     | 2024 | 1       | Monday
2       | 2024-01-16 | 16  | 1     | 2024 | 1       | Tuesday
3       | 2024-01-17 | 17  | 1     | 2024 | 1       | Wednesday
4       | 2024-01-18 | 18  | 1     | 2024 | 1       | Thursday
```
🟢 Dimensión: dim_currency
```sql
currency_code | currency_name
USD           | US Dollar
EUR           | Euro
```
## 💬 Consultas que ahora son súper rápidas
📊 Ventas totales por empresa
```sql
SELECT 
    dc.company_name,
    SUM(ft.amount) AS ventas_totales
FROM facts_transactions ft
JOIN dim_company dc ON ft.company_id = dc.company_id
GROUP BY dc.company_name;
```
📈 Ventas mensuales
```sql
SELECT 
    dt.month,
    dt.year,
    SUM(ft.amount) AS ventas_totales
FROM facts_transactions ft
JOIN dim_time dt ON ft.date_id = dt.date_id
GROUP BY dt.year, dt.month
ORDER BY dt.year, dt.month;
```
🌍 Ventas por país
```sql
SELECT 
    dc.country,
    SUM(ft.amount) AS ventas_totales
FROM facts_transactions ft
JOIN dim_company dc ON ft.company_id = dc.company_id
GROUP BY dc.country;
```
## 🎯 Beneficios del modelado dimensional
✅ Rendimiento: Consultas 10-100x más rápidas
✅ Simplicidad: Fácil de entender para usuarios de negocio
✅ Flexibilidad: Puedes analizar los datos de múltiples formas
✅ Escalabilidad: Diseñado para grandes volúmenes de datos

## 💡 Consejo Millonario
"Primero identifica la granularidad de tu tabla de hechos - ¿cada fila es una transacción, un día, un mes? Luego, todas las dimensiones deben poder describir esa granularidad."

## 🧭 Guía rápida
🔍 Para diseñar tu modelo:
- Identifica el proceso de negocio a analizar
- Define la granularidad de los hechos
- Elige las dimensiones relevantes
- Determina las métricas (hechos) a almacenar

## 🧩 Recuerda:
- Las tablas de hechos tienen las claves foráneas y las métricas
- Las tablas de dimensiones tienen los atributos descriptivos
- El modelo estrella es el más común: una tabla de hechos rodeada de dimensiones

## 🏁 Tu nuevo superpoder
✅ Diseñar bases de datos optimizadas para análisis
✅ Crear estructuras que permitan consultas rápidas y complejas
✅ Organizar los datos de manera intuitiva para los usuarios
✅ Facilitar la creación de dashboards y reportes

[← Carta 08: Vistas y Optimización](carta_08_vistas.md  ) | [📚 Ir al Índice](INDICE_PRINCIPAL.md) | [Carta 10: Análisis Business →](carta_10_analisis.md)