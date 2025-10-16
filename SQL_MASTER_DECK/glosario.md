# 🦄 SQL FUNDAMENTOS — DICCIONARIO DEFINITIVO  
**Archivo sugerido:** `sql_fundamentos_definitivo.md`  
**Alcance:** Fundamentos completos y precisos de SQL y modelado de datos. Formato Markdown listo para VS Code.  
**Nota:** Solo FUNDAMENTOS (definiciones, ejemplos mínimos, diagramas, buenas prácticas, ejercicios y errores comunes).  

---

## ÍNDICE
1. Resumen ejecutivo  
2. Conceptos básicos (definiciones precisas)  
3. Tipos de datos (tabla práctica)  
4. Sentencias esenciales — DDL / DML / DCL / TCL (qué significa cada sigla)  
5. Cláusulas SELECT y operadores (tabla + orden de ejecución)  
6. Joins, self-join y subconsultas (ejemplos)  
7. Vistas, índices, stored procedures y triggers (qué y cuándo)  
8. Constraints (tabla con ejemplos y ON DELETE/UPDATE)  
9. Modelado dimensional — fundamentos (facts / dims / surrogate keys / granularidad)  
10. Diagramas ER — símbolos, líneas, colores y lectura (completo)  
11. Ejemplos completos y snippets SQL (mínimos y claros)  
12. Buenas prácticas (checklist)  
13. Glosario alfabético corto (siglas y términos)  
14. Lectura rápida (plantilla DER)  
15. Anexo A: 10 ejercicios prácticos (con respuestas clave)  
16. Anexo B: Errores comunes y cómo evitarlos

---

## 1 — RESUMEN EJECUTIVO
Documento de referencia compacto y exhaustivo sobre fundamentos de SQL y modelado de datos: definiciones limpias, tipos de datos, sentencias y siglas, cláusulas, joins, subconsultas, vistas, índices, constraints, modelado dimensional (facts/dimensions), diagramas ER (símbolos y lectura), ejemplos listos para ejecutar y checklist de buenas prácticas. Ideal para clases, guías rápidas o consulta técnica.

---

## 2 — CONCEPTOS BÁSICOS (DEFINICIONES PRECISAS)

- **Base de datos**: Conjunto organizado de tablas y objetos (índices, vistas, procedimientos) que permite almacenar y consultar información estructurada.  
- **Tabla (Entidad)**: Estructura compuesta por columnas (atributos) y filas (registros).  
- **Columna (Atributo)**: Campo con nombre y tipo de dato que describe un atributo de la entidad.  
- **Fila (Registro / Tupla)**: Instancia completa de valores para todas/some columnas de la tabla.  
- **Primary Key (PK)**: Columna o conjunto de columnas cuyo valor identifica **unívocamente** cada fila en la tabla; no admite NULL y debe ser estable.  
- **Foreign Key (FK)**: Columna (o conjunto) en una tabla que referencia una PK (o UNIQUE) de otra tabla para mantener integridad referencial. Una FK garantiza que el valor exista en la tabla referenciada (o sea NULL si está permitido).  
- **Índice (Index)**: Estructura auxiliar que acelera búsquedas y ordenaciones; afecta rendimiento de escritura.  
- **Vista (View)**: Consulta almacenada que se consulta como una tabla virtual; no necesariamente almacena datos (salvo vistas materializadas).  
- **Transacción**: Conjunto de operaciones que se ejecutan como una unidad; cumple propiedades **ACID** (Atomicidad, Consistencia, Aislamiento, Durabilidad).  
- **Normalización**: Conjunto de reglas y formas normales (1NF, 2NF, 3NF…) destinadas a reducir redundancia y anomalías de actualización.  
- **Denormalización**: Deliberada duplicación de datos para mejorar rendimiento de consulta.  
- **Granularidad**: Nivel de detalle representado por un registro (por ejemplo: por transacción, por línea de pedido, por día). Define la “unidad” en la tabla de hechos.  
- **Cardinalidad**: Cantidad de instancias que participan en una relación entre entidades: 1:1, 1:N, N:M.  
- **Surrogate Key**: Clave artificial (por ejemplo `INT AUTO_INCREMENT` o `UUID`) creada para identificar filas internamente; no tiene significado del mundo real.  
- **Natural Key**: Clave derivada de datos del dominio (p.ej. número de expediente); tiene significado contextual.

---

## 3 — TIPOS DE DATOS (PRÁCTICOS)

| Categoría                           | Tipos (ejemplos) | Uso recomendado |
|-------------------------------------|------------------|-----------------|
| Numéricos | `INT`, `BIGINT`, `DECIMAL(p,s)`, `NUMERIC(p,s)`, `FLOAT` | `DECIMAL/NUMERIC` para montos monetarios; `INT/BIGINT` para IDs/contadores. Evitar `FLOAT` para finanzas. |
| Texto | `CHAR(n)`, `VARCHAR(n)`, `TEXT` | `VARCHAR` para la mayoría; `TEXT` para textos largos. |
| Fecha / Hora | `DATE`, `TIME`, `DATETIME`, `TIMESTAMP` | `DATE` para fechas, `TIMESTAMP` para eventos con zona/hora. |
| Booleano | `BOOLEAN`, `TINYINT(1)` | Flags (`is_active`). |
| Binario | `BLOB`, `BYTEA` | Archivos binarios/imagenes. |
| Estructurado | `JSON`, `JSONB` | Datos semiestructurados (p. ej. arrays/objetos). |
| Identificadores | `UUID`, `CHAR`, `VARCHAR` | Identificadores distribuidos o externos. |

**Consejo:** define precisión (`DECIMAL(12,2)`) según necesidades; evita `TEXT` como clave.

---

## 4 — SENTENCIAS ESENCIALES — DDL / DML / DCL / TCL (¿QUÉ SIGNIFICA CADA SIGLA?)

- **DDL — Data Definition Language** (Lenguaje de Definición de Datos)  
  Comandos: `CREATE`, `ALTER`, `DROP`, `TRUNCATE`.  
  Propósito: crear y modificar estructuras de la BD (tablas, índices, vistas).

- **DML — Data Manipulation Language** (Lenguaje de Manipulación de Datos)  
  Comandos: `SELECT`, `INSERT`, `UPDATE`, `DELETE`, `MERGE`.  
  Propósito: leer y modificar datos en las tablas.

- **DCL — Data Control Language** (Lenguaje de Control de Datos)  
  Comandos: `GRANT`, `REVOKE`.  
  Propósito: gestión de permisos y seguridad.

- **TCL — Transaction Control Language** (Lenguaje de Control de Transacciones)  
  Comandos: `BEGIN` / `START TRANSACTION`, `COMMIT`, `ROLLBACK`, `SAVEPOINT`.  
  Propósito: controlar la atomicidad y consistencia de conjuntos de operaciones.

---

## 5 — CLÁUSULAS `SELECT` Y OPERADORES (TABLA + ORDEN DE EJECUCIÓN)

### Orden lógico (ejecución conceptual)
| Orden lógico | Cláusula |
|--------------|----------|
| 1 | `FROM` / `JOIN` |
| 2 | `WHERE` |
| 3 | `GROUP BY` |
| 4 | `HAVING` |
| 5 | `SELECT` |
| 6 | `ORDER BY` |
| 7 | `LIMIT` / `OFFSET` |

### Cláusulas y operadores útiles
| Cláusula / Operador | Uso |
|---------------------|-----|
| `SELECT` | Selecciona columnas/expresiones. |
| `FROM` | Indica tabla(s) o vista(s) de origen. |
| `WHERE` | Filtra filas por condiciones booleanas. |
| `GROUP BY` | Agrupa filas para agregación. |
| `HAVING` | Filtra grupos (después de agrupar). |
| `ORDER BY` | Ordena resultados. |
| `LIMIT` / `OFFSET` | Controla número de filas devueltas. |
| `DISTINCT` | Elimina duplicados. |
| `AS` | Alias para columnas o tablas (`col AS alias`). |
| `CASE WHEN` | Expresión condicional en SELECT. |
| `IN`, `BETWEEN`, `LIKE`, `IS NULL` | Filtros prácticos. |
| `EXISTS` | Verifica existencia de filas en subconsulta. |

**Ejemplo `CASE`:**
```sql
SELECT nombre,
  CASE
    WHEN sueldo >= 50000 THEN 'alto'
    WHEN sueldo >= 30000 THEN 'medio'
    ELSE 'bajo'
  END AS rango_sueldo
FROM empleados;
```
## 6 — JOINS, SELF-JOIN Y SUBCONSULTAS (EJEMPLOS)
INNER JOIN (solo coincidencias)
```sql
SELECT c.nombre, p.total
FROM clientes c
INNER JOIN pedidos p ON c.id = p.cliente_id;
```
LEFT JOIN (todos de la izquierda)
```sql
SELECT c.nombre, p.total
FROM clientes c
LEFT JOIN pedidos p ON c.id = p.cliente_id;
```
RIGHT JOIN / FULL JOIN (dependen del SGBD)
```sql
-- FULL OUTER JOIN (si el SGBD lo soporta)
SELECT a.*, b.*
FROM A
FULL JOIN B ON A.id = B.a_id;
```
SELF JOIN (una tabla relacionada consigo misma)
```sql
-- Ej: empleados y su jefe (empleado.manager_id referencia empleados.id)
SELECT e.nombre AS empleado, m.nombre AS jefe
FROM empleados e
LEFT JOIN empleados m ON e.manager_id = m.id;
```
Subconsulta (escalares / IN / EXISTS)
```sql
-- IN
SELECT nombre FROM clientes
WHERE id IN (SELECT cliente_id FROM pedidos WHERE total > 100);

-- EXISTS
SELECT nombre FROM clientes c
WHERE EXISTS (SELECT 1 FROM pedidos p WHERE p.cliente_id = c.id AND p.total > 100);
```
N:M con tabla intermedia
```sql
CREATE TABLE producto_pedido (
  producto_id INT NOT NULL,
  pedido_id INT NOT NULL,
  cantidad INT NOT NULL,
  PRIMARY KEY (producto_id, pedido_id),
  FOREIGN KEY (producto_id) REFERENCES productos(id),
  FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
);
```
## 7 — VISTAS, ÍNDICES, STORED PROCEDURES Y TRIGGERS
Vistas
- Qué: consultas guardadas usadas como tablas virtuales.
- Cuándo: simplificar consultas frecuentes, encapsular lógica.
- Nota: vistas normales no mejoran rendimiento; las materializadas sí, dependiendo del SGBD.

```sql
CREATE VIEW v_clientes_activos AS
SELECT id, nombre, email FROM clientes WHERE activo = 1;
```
Índices
- Qué: estructuras (B-tree, hash) que aceleran búsquedas.
- Cuándo: columnas usadas en WHERE, JOIN, ORDER BY.
- Precaución: aumentan coste de INSERT/UPDATE/DELETE; elegir columnas selectivas.

```sql
CREATE INDEX idx_clientes_email ON clientes(email);
```
## 8 — CONSTRAINTS (TABLA CON EJEMPLOS Y ON DELETE / ON UPDATE)
Constraint	Descripción	Ejemplo
NOT NULL	No permite NULL	nombre VARCHAR(100) NOT NULL
UNIQUE	Valores únicos	email VARCHAR(150) UNIQUE
PRIMARY KEY	Identificador único	id INT PRIMARY KEY
FOREIGN KEY	Referencia a otra tabla	FOREIGN KEY (cliente_id) REFERENCES clientes(id)
CHECK	Condición por fila	CHECK (edad >= 18)
DEFAULT	Valor por defecto	fecha_creacion DATE DEFAULT CURRENT_DATE

Opciones de integridad referencial:

```sql
Copiar código
FOREIGN KEY (cliente_id)
  REFERENCES clientes(id)
  ON DELETE CASCADE
  ON UPDATE RESTRICT;
```
- ON DELETE CASCADE: al borrar la fila referenciada, borrar filas dependientes.
- ON DELETE SET NULL: al borrar la fila referenciada, establecer NULL en la FK (si permite NULL).
- ON UPDATE CASCADE: propaga actualizaciones de clave.
- RESTRICT / NO ACTION: impide la operación si hay dependientes.

## 9 — MODELADO DIMENSIONAL — FUNDAMENTOS (FACTS / DIMS / SURROGATE / GRANULARIDAD)

Definiciones (precisas)

- Tabla de Hechos (Fact table): tabla central en un data warehouse que almacena medidas cuantitativas (métricas) y claves hacia tablas de dimensión. Cada fila representa un evento o transacción al nivel de granularidad definido. Ejemplos de medidas: monto, cantidad.

- Tabla de Dimensión (Dimension table): tabla que describe entidades (atributos contextuales) utilizadas para filtrar y agrupar hechos: dim_cliente, dim_producto, dim_tiempo. Contienen atributos descriptivos (nombre, categoría).

- Granularidad (Granularity): la unidad elemental que representa una fila en la tabla de hechos (p. ej. "una línea de factura", "una transacción", "un click"). Definir granularidad es crucial: determina volumen y tipo de análisis posible.

- Surrogate Key: clave artificial en dimensiones (p. ej. cliente_sk) usada en el data warehouse para asegurar estabilidad, independencia de cambios en claves naturales.

- Natural Key: clave del sistema operacional que tiene significado en el negocio (p. ej. cliente_id del OLTP).

- Conformed Dimension: dimensión compartida entre múltiples hechos para permitir análisis consistentes.

- Grain: sinónimo de granularidad; especifica exactamente qué representa cada registro en la fact table.

## Modelos (diferencias)
- Star Schema: fact table central y dimensiones desnormalizadas (atributos repetidos dentro de la dimensión). Ventaja: consultas simples y rápidas; desventaja: cierto almacenamiento extra.

- Snowflake Schema: dimensiones normalizadas en múltiples tablas relacionadas. Ventaja: menos redundancia; desventaja: más joins y consultas más complejas.

- Modelo híbrido: combinación según necesidades (desnormalizar atributos de alta consulta).

## 10 — DIAGRAMAS ER — SÍMBOLOS, LÍNEAS, COLORES Y LECTURA (COMPLETO)
**Símbolos y significados**
📘 Símbolos en Diagramas ER:

- 🟦 Rectángulo: tabla / entidad
- 🟢 Óvalo / Elipse: atributo (menos usado en diagramas físicos)
- 🔑 PK: Primary Key (identificador único)
- 🔸 FK: Foreign Key (referencia a PK / UNIQUE)
- 💎 Rombo / Diamante: relación (modelos conceptuales)
- 🪶 Crow’s Foot (pata de cuervo): notación de cardinalidad — muestra “muchos”
- ➖ Línea sólida: relación obligatoria (participación total)
- Línea punteada: relación opcional (participación parcial) -----------
- 🔁 Flecha simple: dirección de referencia (opcional, según notación)
- 🏷️ Etiqueta en línea: describe multiplicidad (1, 0..1, 1..*, *, etc.)

**Cardinalidad y opcionalidad (cómo leer)**
- 1 : 1 → cada fila A corresponde a una fila B y viceversa.
- 1 : N (1..*) → una fila A puede relacionarse con muchas filas B; cada B se relaciona con una sola A.
- N : M (M:N) → múltiples A pueden relacionarse con múltiples B; requiere tabla intermedia.
- Opcionalidad: 0..1 (0 o 1), 1 (exactamente 1), 0..* (cero o muchos), 1..* (uno o muchos).

*Convención de colores (sugerida — no estándar)**
- 🟢 Verde → relación bien definida / FK consistente.
- 🟠 Naranja → relación parcial / opcional / revisión.
- 🔴 Rojo → error / inconsistencia (tipos distintos, FK sin PK).
- 🔵 Azul → tablas puente / catálogo.
- 🟡 Amarillo → tabla de hechos (fact).

Ejemplos ASCII
1 : N

```sql
┌───────────┐   1    ┌────────────┐
│ CLIENTES  │───────<│  PEDIDOS   │
└───────────┘        └────────────┘
```
N : M (con tabla intermedia)
```sql
┌──────────┐   N    ┌──────────────────┐   M    ┌──────────┐
│ PRODUCTOS│───────<│ PRODUCTO_PEDIDOS │>──────│ PEDIDOS  │
└──────────┘        └──────────────────┘       └──────────┘
```
Opcionalidad (punteada = opcional)
```sql
CLIENTES . . .> DIRECCIONES
(Cliente puede no tener dirección)
```
11 — EJEMPLOS COMPLETOS Y SNIPPETS SQL (MÍNIMOS Y CLAROS)
```sql

-- Crear tablas principales
CREATE TABLE clientes (
  id INT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pedidos (
  id INT PRIMARY KEY,
  cliente_id INT NOT NULL,
  fecha DATE,
  total DECIMAL(12,2),
  FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE
);

-- Insertar
INSERT INTO clientes (id, nombre, email) VALUES (1, 'Ana', 'ana@example.com');

-- Consultar con join y alias
SELECT c.nombre AS cliente, p.total AS importe
FROM clientes c
LEFT JOIN pedidos p ON c.id = p.cliente_id
WHERE p.total > 100
ORDER BY p.total DESC
LIMIT 10;

-- Agregación y CASE
SELECT cliente_id,
       COUNT(*) AS total_pedidos,
       SUM(total) AS suma_total,
       AVG(total) AS promedio,
       CASE WHEN SUM(total) > 10000 THEN 'VIP' ELSE 'NORMAL' END AS categoria
FROM pedidos
GROUP BY cliente_id
HAVING COUNT(*) > 5;
```
12 — BUENAS PRÁCTICAS (CHECKLIST RÁPIDO)
```sql
✅ Nombres claros y consistentes: snake_case (p.ej. clientes, fact_ventas).
✅ Definir PK y FK desde diseño. Mantener tipos coherentes entre FK y PK
✅ Usar DECIMAL para dinero; evitar FLOAT en finanzas.
✅ Evitar SELECT * en producción; seleccionar columnas necesarias.
✅ Añadir created_at y updated_at en tablas transaccionales.
✅ Indexar columnas usadas en JOIN/WHERE/ORDER BY con criterio.
✅ Documentar diagrama ER, convenciones de colores y leyenda.
✅ Versionar migraciones y mantener scripts idempotentes.
✅ Probar integridad con datos de muestra y migraciones en entorno de staging.
✅ Controlar accesos con roles y GRANT mínimos necesarios.
```
13 — GLOSARIO ALFABÉTICO CORTO
- ACID: Atomicidad, Consistencia, Aislamiento, Durabilidad (propiedades de transacciones).
- DDL: Data Definition Language.
- DML: Data Manipulation Language.
- DCL: Data Control Language.
- TCL: Transaction Control Language.
- Fact: Tabla de hechos con métricas y FKs.
- Dimension: Tabla descriptiva usada para análisis.
- Granularidad: Unidad de registro en una fact table.
- Cardinalidad: Relación cuantitativa entre entidades.
- Surrogate Key: Clave artificial interna.
- Normalization: Proceso de estructurar tablas para evitar redundancia.

14 — LECTURA RÁPIDA (PLANTILLA COPY-READY)
1. Localiza la tabla central (fact o entidad ancla).
2. Encuentra PKs (🔑) y FKs (🔸).
3. Identifica la cardinalidad con Crow’s Foot.
4. Si Crow’s Foot en ambos lados → tabla intermedia (N:M).
5. Revisa colores/etiquetas: 🔴 error, 🟠 revisar, 🟢 OK.
6. Verifica índices y columnas de JOIN/WHERE.
7. Resume en 1 frase la relación principal.



