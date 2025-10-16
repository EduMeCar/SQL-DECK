# 🧠 CARTA 08: VISTAS Y OPTIMIZACIÓN 🎯

## 🎯 Objetivo  
Aprender a crear consultas reutilizables y hacer que tus búsquedas sean ultra rápidas.

🎯 LO ESENCIAL QUE DEBES SABER
Vista = una consulta guardada con nombre (tabla virtual). Reutilizable y legible.
Índice = estructura que acelera búsquedas (como el índice de un libro).
COALESCE = el limpiador de NULLs en tus reportes.

Juntos te permiten construir pipelines más claros, rápidos y robustos.

## 📊 Tus tablas de siempre  
```sql
TABLA: company  
id | company_name   | country    | employees  
1  | TechCorp       | USA        | 150  
2  | DataSystems    | Germany    | 80  
3  | StartUpWX      | France     | 10  

TABLA: transactions  
id | company_id | amount | status    | timestamp  
1  | 1          | 1208   | approved  | 2024-01-15  
2  | 2          | 800    | approved  | 2024-01-16  
3  | 1          | 2500   | pending   | 2024-01-17  
4  | 1          | 1800   | approved  | 2024-01-18  
```
## 💻 Vistas – Tus consultas guardadas  

### 📖 Qué es una vista  
Una vista es una consulta SQL que guardas con nombre, como si fuera una tabla virtual. Puedes usarla una y otra vez sin escribir todo el código.

### 🧭 Cuándo usar vistas  
- Cuando tienes consultas complejas que usas frecuentemente.  
- Cuando quieres simplificar consultas para otros usuarios.  
- Cuando necesitas ocultar la complejidad de tus tablas.

### 🏗️ Crear tu primera vista  
```sql
CREATE VIEW vista_empresas_ventas AS  
SELECT  
 c.company_name,  
 c.country,  
 COUNT(t.id) AS total_transacciones,  
 COALESCE(SUM(t.amount), 0) AS ventas_totales  
FROM company c  
LEFT JOIN transactions t ON c.id = t.company_id  
GROUP BY c.company_name, c.country;
```
### 🧪 Usar tu vista  
```sql
SELECT * FROM vista_empresas_ventas;  
SELECT * FROM vista_empresas_ventas WHERE ventas_totales > 1000;  
SELECT * FROM vista_empresas_ventas ORDER BY ventas_totales DESC;
```
### 🎯 Vista con filtros específicos  
```sql
CREATE VIEW vista_transacciones_aprobadas AS  
SELECT  
 c.company_name,  
 t.amount,  
 t.timestamp  
FROM company c  
JOIN transactions t ON c.id = t.company_id  
WHERE t.status = 'approved';
```
## 🪄 COALESCE – Tu eliminador de NULL  

### 📖 Qué es COALESCE  
COALESCE toma varios valores y devuelve el **primer valor que no sea NULL**.

### 🚀 Por qué usarlo  
Porque los NULL arruinan tus reportes y cálculos. COALESCE los convierte en valores útiles.

### 🧪 Ejemplo práctico  
```sql
COALESCE(valor1, valor2, valor3, …)

- Si `valor1` no es NULL → devuelve valor1.  
- Si `valor1` es NULL → revisa valor2.  
- Y así sucesivamente.
```
### 🧼 Ejemplo en vistas  
```sql
CREATE VIEW vista_empresas_limpias AS  
SELECT  
 c.company_name,  
 COALESCE(COUNT(t.id), 0) AS transacciones,  
 COALESCE(SUM(t.amount), 0) AS ventas_totales,  
 COALESCE(AVG(t.amount), 0) AS promedio_ventas  
FROM company c  
LEFT JOIN transactions t ON c.id = t.company_id  
GROUP BY c.company_name;
```
### ⚔️ Sin COALESCE vs Con COALESCE  
```sql
-- ❌ Problema: NULL  
SELECT SUM(amount) FROM transactions WHERE company_id = 999;  
Resultado: NULL

-- ✅ Solución: Limpio  
SELECT COALESCE(SUM(amount), 0) FROM transactions WHERE company_id = 999;  
Resultado: 0
```
## 🚀 Cómo lo usas en tus Sprints?

### 🧠 Ejemplo de Sprint 3 – VistaMarketing  
```sql
CREATE VIEW VistaMarketing AS  
SELECT  
 c.company_name AS Nom_companyia,  
 c.phone AS Telefon_contacte,  
 c.country AS Pais_residencia,  
 COALESCE(AVG(t.amount), 0) AS Mitjana_compra  
FROM company c  
JOIN transaction t ON c.id = t.company_id  
WHERE t.amount IS NOT NULL  
GROUP BY c.id  
ORDER BY Mitjana_compra DESC;
```
### 🧠 Ejemplo de Sprint 3 – InformeTecnico  
```sql
CREATE VIEW InformeTecnico AS  
SELECT  
 t.id AS ID_transaccio,  
 u.name AS Nom_usuari,  
 u.surname AS Cognom_usuari,  
 cc.iban AS IBAN_targeta,  
 c.company_name AS Nom_companyia  
FROM transaction t  
JOIN data_user u ON t.user_id = u.id  
JOIN credit_card cc ON t.credit_card_id = cc.id  
JOIN company c ON t.company_id = c.id  
ORDER BY t.id DESC;
```
## ⚡ Índices – Tus aceleradores de búsqueda  

### 📖 Qué es un índice  
Un índice es como el índice de un libro: en lugar de leer todo, vas directo a lo que buscas.  
Con tablas grandes, los índices hacen que las búsquedas sean instantáneas.

### 🧭 Cuándo usar índices  
- Cuando buscas frecuentemente por una columna específica.  
- Cuando tienes tablas con miles o millones de registros.  
- Cuando las consultas se vuelven lentas.

### 🧰 Crear índices básicos  
```sql
CREATE INDEX idx_company_name ON company(company_name);  
CREATE INDEX idx_transactions_company_date ON transactions(company_id, timestamp);  
CREATE INDEX idx_transactions_amount ON transactions(amount);
```
### 🔐 Índices únicos (evitar duplicados) 
```sql 
CREATE UNIQUE INDEX idx_company_name_unique ON company(company_name);  
CREATE UNIQUE INDEX idx_transaction_id_unique ON transactions(id);
```
🐞 ERRORES FRECUENTES (y cómo evitarlos)
```sql
❌ Crear vistas sin documentarlas → nadie entiende la lógica.
✅ Documenta (comentarios o README).

❌ Materializar todo → uso excesivo de espacio y refresh costoso.
✅ Materializa solo si consultas son muy repetidas y costosas.

❌ Indexar sin medir → sobrecarga en escrituras.
✅ Usa EXPLAIN y métricas antes/después.

❌ No usar COALESCE tras LEFT JOIN → NULLs que rompen dashboards.
✅ COALESCE en métricas clave.

❌ Encadenar vistas complejas → debugging imposible.
✅ Prefiere una vista clara o una materialized view intermedia.
``` 

## 💡 Consejo Millonario  
> “Crea vistas para consultas que uses más de 3 veces, e índices para columnas que uses en WHERE más de 100 veces. Y siempre usa COALESCE en LEFT JOINs para evitar NULLs.”

## 🧭 Guía rápida

### 📊 Crea una vista cuando:  
- Usas la misma consulta compleja en múltiples lugares.  
- Quieres simplificar acceso a datos.  
- Necesitas ocultar estructuras complejas.

### 🧼 Usa COALESCE cuando:  
- Haces LEFT JOINs (riesgo de NULL).  
- Usas SUM, AVG o COUNT.  
- Exportas datos.  
- Presentas información.

### 🚀 Crea un índice cuando:  
- Tus consultas con WHERE son lentas.  
- Hay más de 10.000 registros.  
- Buscas frecuentemente por las mismas columnas.

## 🏁 Tu nuevo superpoder  
✅ Automatizar consultas complejas.  
✅ Eliminar NULLs molestos.  
✅ Búsquedas instantáneas con índices.  
✅ Acceso simplificado para tu equipo.  
✅ Reportes predefinidos y rápidos.  
✅ Optimización real del rendimiento.

[← Carta 07: Manipulación de Datos](carta_07_operaciones.md) | [📚 Ir al Índice](INDICE_PRINCIPAL.md) | [Carta 09: Modelado Dimensional →](carta_09_modelado.md)
