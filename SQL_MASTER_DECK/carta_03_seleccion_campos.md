# CARTA 03: SELECCIÓN DE CAMPOS 🎯

**Objetivo:** Aprender a mostrar SOLO la información que necesitas, ni más ni menos

## 🎯 LO ESENCIAL QUE DEBES SABER

Si en la Carta 01 aprendiste a ver todas las columnas (SELECT *) y en la Carta 02 a filtrar filas (WHERE), ahora aprenderás a seleccionar columnas específicas.
Esto te da precisión quirúrgica: consultas más limpias, ligeras, legibles y profesionales.

👉 Pensar bien qué campos seleccionar es una de las habilidades más importantes en SQL, especialmente cuando trabajas con bases de datos grandes, reportes críticos o APIs que deben ser eficientes.

## 💻 4 CONCEPTOS CLAVE QUE DOMINARÁS

### 1. SELECCIÓN DE COLUMNAS ESPECÍFICAS

```sql
-- En lugar de ver todo, ve solo lo necesario
SELECT id, company_name FROM company;
SELECT amount, transaction_date FROM transactions;
```
✅ Beneficios:
- Menos datos → consultas más rápidas
- Menos ruido → foco en lo relevante
- Mejores reportes y dashboards

### 2. ALIAS PARA CLARIDAD

```sql
-- Renombra columnas para que tengan más sentido
SELECT company_name AS nombre_empresa, country AS pais FROM company;
SELECT amount AS monto, transaction_date AS fecha FROM transactions;
```
📌 Usa AS para dar nombres claros y legibles — especialmente útil cuando otros leerán tu consulta.

### 3. CÁLCULOS EN TIEMPO REAL

```sql
-- Realiza operaciones directamente en la consulta
SELECT amount, amount * 1.16 AS amount_con_iva FROM transactions;
SELECT employees, employees * 12 AS gasto_anual_salarios FROM company;
```
⚡ Esto te permite crear columnas derivadas sin modificar la base original.

### 4. FUNCIONES BÁSICAS

```sql
-- Usa funciones para transformar datos
SELECT UPPER(company_name) AS nombre_mayusculas FROM company;
SELECT COUNT(*) AS total_transacciones FROM transactions;
```
🧠 Las funciones convierten tus columnas en información útil: mayúsculas, conteos, cálculos, fechas, etc.

## 🚀 COMBINACIONES Y PATRONES PRÁCTICOS

### COMBINANDO CON WHERE (CARTA 02)

```sql
-- Selección precisa: qué columnas Y qué filas
SELECT company_name, country FROM company WHERE employees > 100;

SELECT amount, transaction_date
FROM transactions
WHERE declined = false AND amount > 1000;
```
✨ La combinación de selección + filtrado es el corazón de casi cualquier análisis real.

### MULTIPLES COLUMNAS CON OPERACIONES

```sql
-- Información enriquecida en una sola consulta
SELECT 
    company_name,
    employees,
    employees * 12 AS gasto_anual_estimado,
    country
FROM company
WHERE employees BETWEEN 50 AND 200;
```
👉 Aquí ya no estás “viendo datos”: estás construyendo conocimiento.

## 📚 EJERCICIOS PROGRESIVOS CON TUS DATOS

### EJERCICIO 1: SELECCIÓN BÁSICA

```sql
-- Muestra solo los nombres y países de todas las empresas
SELECT company_name, country FROM company;
```

### EJERCICIO 2: ALIAS Y CÁLCULOS

```sql
-- Muestra montos de transacciones con IVA incluido (16%)
SELECT amount, amount * 1.16 AS amount_con_iva FROM transactions;
```

### EJERCICIO 3: COMBINACIÓN CON FILTROS

```sql
-- Muestra nombre y empleados de empresas tech con más de 50 empleados
SELECT company_name, employees FROM company 
WHERE company_name LIKE '%Tech%' AND employees > 50;
```

### EJERCICIO 4: CONSULTA COMPLETA

```sql
-- Informe ejecutivo: empresas mexicanas con métricas clave
SELECT 
    company_name AS empresa,
    employees AS empleados,
    employees * 12 AS gasto_anual_estimado,
    year_founded AS año_fundacion
FROM company
WHERE country = 'Mexico'
AND employees > 10;
```

## 🔍 EJERCICIOS PUENTE (DE SIMPLE A COMPLEJO)

### PUENTE 1: DE SELECT * A SELECT ESPECÍFICO

```sql
-- Antes: SELECT * FROM transactions;
-- Ahora: 
SELECT 
    id,
    amount,
    transaction_date,
    CASE WHEN amount > 1000 THEN 'ALTO' ELSE 'NORMAL' END AS categoria
FROM transactions
WHERE declined = false;
```

### PUENTE 2: DEBUGGEO DE ERRORES COMUNES

```sql
-- Error: Falta coma entre columnas
SELECT company_name country FROM company; -- MAL
SELECT company_name, country FROM company; -- BIEN

-- Error: Alias sin AS (funciona pero menos claro)
SELECT amount monto FROM transactions; -- CONFUSO
SELECT amount AS monto FROM transactions; -- CLARO
```

## 💡 EL CONSEJO MILLONARIO: CÓMO PENSAR LA SELECCIÓN

### TU PLANTILLA MENTAL PARA ELEGIR CAMPOS:

**PASO 1: PREGUNTA "¿QUÉ QUIERO SABER?"**

- ¿Solo nombres? → SELECT company_name
- ¿Nombres y ubicación? → SELECT company_name, country, city
- ¿Métricas de performance? → SELECT amount, transaction_date, status

**PASO 2: PIENSA EN QUIÉN VERÁ LOS DATOS**
```sql
- Para ti mismo: SELECT * (rápido)
- Para un reporte: SELECT columnas_específicas (profesional)
- Para una API: SELECT solo_lo_necesario (eficiente)
```
**PASO 3: OPTIMIZA LA LEGIBILIDAD**

- Usa ALIAS para nombres comprensibles
- Calcula columnas derivadas cuando sea útil
- Agrupa información relacionada

**PASO 4: CONSTRUYE POR CAPAS**
```sql
1. SELECT * (para explorar)
2. SELECT col1, col2 (columnas esenciales)
3. SELECT col1, col2, cálculo AS alias (enriquecer)
4. SELECT ... WHERE ... (filtrar)
```
## 🎯 TU NUEVO SUPERPODER

Ahora controlas exactamente lo que muestras:

- De SELECT * a selección quirúrgica
- Columnas renombradas para claridad
- Cálculos en tiempo real
- Combinación perfecta con WHERE
- Consultas más rápidas y profesionales

**Próximo paso:** En la **Carta 04** aprenderás a unir tablas con JOINS, llevando tu poder de análisis al siguiente nivel.

[← Carta 02: Filtros WHERE](carta_02_filtros_where.md) | [📚 Ir al Índice](INDICE_PRINCIPAL.md) | [Carta 04: JOINS entre Tablas →](carta_04_joins.md)