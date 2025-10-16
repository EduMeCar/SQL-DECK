# CARTA 01: SELECT BÁSICO 🃏
**Objetivo:** Sentar las bases sólidas de todas las consultas SQL que vendrán

## 🎯 LO ESENCIAL QUE DEBES SABER
SELECT * es tu ventana directa a toda la información de la base de datos.
Es el punto de partida para TODO lo demás que aprenderás: filtros, joins, agrupaciones y más.

👉 Cada consulta SQL, sin importar su complejidad, empieza con una selección de datos.
👉 “SELECT” significa: “muéstrame esto”. Por eso es la piedra angular de cualquier análisis.

## 💻 EL FUNDAMENTO DE TODAS TUS CONSULTAS

### LA CONSULTA MÁS IMPORTANTE
```sql
SELECT * FROM tabla;
```
### TUS PRIMEROS PASOS CON TUS DATOS REALES
```sql
-- Ver toda la información de transacciones
SELECT * FROM transactions;

-- Explorar todas las empresas
SELECT * FROM company;

-- Conocer todos los usuarios
SELECT * FROM users;
```
📌 IMPORTANTE: SELECT * devuelve todas las columnas de una tabla.
Esto es perfecto para explorar, pero no siempre eficiente en entornos grandes.
Más adelante aprenderás a seleccionar solo lo necesario (Carta 03).

## 🚀 DE CERO A PRIMEROS RESULTADOS

### POR QUÉ EMPEZAMOS CON SELECT *
- **Descubrimiento**: Ves TODA la estructura de la tabla
- **Exploración**: Entiendes qué datos tienes disponible
- **Planificación**: Decides qué filtrar después (Carta 02)
- **Base sólida**: Es el fundamento para SELECT específico (Carta 03)

### EJEMPLOS INMEDATOS CON TUS DATOS
-- Antes de filtrar, necesitas ver qué hay
```sql
SELECT * FROM transactions;

-- Luego podrás decidir: "Ah, quiero filtrar por amount > 1000"
-- Y después: "Solo necesito ver id y amount"
```
## 📚 EJERCICIOS DE FUNDAMENTOS SÓLIDOS

### EJERCICIO 1: EXPLORACIÓN COMPLETA
```sql
-- Conoce toda tu tabla de empresas
SELECT * FROM company;
```
### EJERCICIO 2: COMPRENSIÓN DE ESTRUCTURA
```sql
-- ¿Qué campos tiene transactions?
SELECT * FROM transactions;
```
### EJERCICIO 3: PREPARACIÓN PARA FILTROS
```sql
-- Explora antes de filtrar (prepara para Carta 02)
SELECT * FROM users;
```
## 💡 Tip de buenas prácticas:
Si la tabla es muy grande, puedes usar LIMIT para no saturarte:
```sql
SELECT * FROM transactions LIMIT 10;
```

### EJERCICIO 4: BASE PARA JOINS FUTUROS
```sql
-- Ve las tablas que luego conectarás (prepara para Carta 04)
SELECT * FROM company;
SELECT * FROM transactions;
```
## 🔍 EJERCICIOS PUENTE (DEL MUNDO REAL AL SQL)

### PUENTE 1: DE LA PREGUNTA A LA CONSULTA
```sql
-- Pregunta: "¿Qué datos tenemos sobre nuestras empresas?"
SELECT * FROM company;

-- Pregunta: "¿Cómo es nuestro historial de transacciones?"
SELECT * FROM transactions;
```
### PUENTE 2: DEBUGGEO INMEDATO
```sql
-- Error común: olvidar el punto y coma
SELECT * FROM transactions; -- BIEN

-- Error común: confundir FROM/FORM
SELECT * FROM transactions; -- BIEN
```
## 💡 EL CONSEJO MILLONARIO: CÓMO PENSAR DESDE LOS CIMIENTOS

### TU PLANTILLA MENTAL PARA EMPEZAR CUALQUIER ANÁLISIS:

**PASO 1: SIEMPRE EMPIEZA CON SELECT ***
- Antes de filtrar, conoce tus datos
- Antes de seleccionar columnas, ve todas las opciones
- Antes de unir tablas, entiende cada una por separado
- Empieza con LIMIT si no sabes cuántas filas tiene la tabla
- Sé consistente con mayúsculas (SELECT / FROM) y minúsculas (nombres de tablas).
- Nombra bien las tablas y entiende su relación lógica.

**PASO 2: HAZTE ESTAS 3 PREGUNTAS:**
1. ¿Qué tabla contiene la información que necesito?
2. ¿Qué campos veo que podrían ser útiles después?
3. ¿Qué relaciones entre tablas puedo intuir?

**PASO 3: CONSTRUYE TU MAPA MENTAL**
- Empresa: id, nombre, empleados, país...
- Transacciones: id, monto, fecha, empresa_id...
- Usuarios: id, nombre, email, país...

**PASO 4: PREPARA EL TERRENO**
Cada SELECT * que hagas hoy te da el contexto para:
- Mañana filtrar con WHERE (Carta 02)
- Pasado seleccionar columnas específicas (Carta 03)
- Luego unir tablas inteligentemente (Carta 04)

## 🎯 TU PRIMER SUPERPODER SQL
Ahora tienes la base más importante:
- Sabes explorar cualquier tabla desde cero
- Entiendes la estructura de tus datos
- Puedes prepararte para filtros y selecciones
- Tienes el fundamento para todo lo que viene

**Próximo paso:** En la **Carta 02** aprenderás a filtrar con WHERE - a transformar "todos los datos" en "solo los datos que necesitas".

[← [📚 Ir al Índice](INDICE_PRINCIPAL.md) | [Carta 02: Filtros WHERE →](carta_02_filtros_where.md)
