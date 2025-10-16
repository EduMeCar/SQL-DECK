# CARTA 07: MANIPULACIÓN DE DATOS 🎯
## Objetivo: Aprender a crear, modificar y eliminar datos en tus tablas

### 🎯 LO ESENCIAL QUE DEBES SABER
Hasta ahora solo has leído datos (SELECT). Ahora aprenderás a escribir datos. Son 3 operaciones básicas que te permiten mantener tus tablas actualizadas:

🧠 Piensa así:
SELECT = leer 📖
INSERT = escribir ✍️
UPDATE = corregir 🔧
DELETE = borrar 🧹

📊 TUS TABLAS DE SIEMPRE
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
## 💻 LAS 3 OPERACIONES QUE DOMINARÁS
1. INSERT - AGREGAR NUEVOS DATOS
CUÁNDO USAR INSERT:
Cuando llega una nueva empresa a tu sistema
Cuando se realiza una nueva transacción
Cuando necesitas agregar cualquier dato nuevo

CÓMO AGREGAR UNA NUEVA EMPRESA:
```sql
-- Agregar una empresa española
INSERT INTO company (company_name, country)
VALUES ('NuevaTech ES', 'Spain');
```
CÓMO AGREGAR UNA NUEVA TRANSACCIÓN:
```sql
-- Agregar una transacción para TechCorp
INSERT INTO transactions (company_id, amount, status)
VALUES (1, 950, 'approved');
```
VERIFICAR QUE SE INSERTÓ:
```sql
-- Ver la empresa nueva
SELECT * FROM company WHERE company_name = 'NuevaTech ES';

-- Ver la transacción nueva  
SELECT * FROM transactions WHERE amount = 950;
```
2. UPDATE - MODIFICAR DATOS EXISTENTES
CUÁNDO USAR UPDATE:
Cuando una empresa cambia de país
Cuando una transacción cambia de estado (de pending a approved)
Cuando necesitas corregir cualquier dato

CÓMO ACTUALIZAR EL PAÍS DE UNA EMPRESA:
```sql
-- DataSystems se muda de Alemania a Austria
UPDATE company 
SET country = 'Austria'
WHERE company_name = 'DataSystems';
```
CÓMO ACTUALIZAR EL ESTADO DE UNA TRANSACCIÓN:
```sql
-- Cambiar una transacción de pending a approved
UPDATE transactions
SET status = 'approved'
WHERE id = 3 AND status = 'pending';
```
CÓMO ACTUALIZAR MÚLTIPLES CAMPOS:
```sql
-- Actualizar país y nombre de una empresa
UPDATE company
SET company_name = 'DataSystems GmbH',
    country = 'Germany'
WHERE id = 2;
```
VERIFICAR LOS CAMBIOS:
```sql
-- Ver que DataSystems ahora es de Austria
SELECT * FROM company WHERE company_name = 'DataSystems';

-- Ver que la transacción 3 ahora está approved
SELECT * FROM transactions WHERE id = 3;
```

⚠️ 3. DELETE - ELIMINAR DATOS
## CUÁNDO USAR DELETE:
Cuando una empresa cierra y quieres eliminar sus datos.
Cuando hay transacciones duplicadas o erróneas.
⚠️ Peligro: si olvidas el WHERE, puedes borrar toda la tabla.

CÓMO ELIMINAR UNA EMPRESA:
```sql
-- Eliminar StartUpWX (la empresa con id 3)
DELETE FROM company
WHERE company_name = 'StartUpWX';
```
CÓMO ELIMINAR TRANSACCIONES ESPECÍFICAS:
```sql
-- Eliminar transacciones rechazadas
DELETE FROM transactions
WHERE status = 'declined';
```
EL PATRÓN MÁS IMPORTANTE - SIEMPRE USAR WHERE:
```sql
-- ✅ BIEN - Elimina solo lo específico
DELETE FROM transactions WHERE amount < 100;

-- ❌ PELIGROSO - Elimina TODAS las transacciones
DELETE FROM transactions;
```


## 🚀 CÓMO LO USAS EN TUS SPRINTS
EJEMPLO DE TU SPRINT 3 - EJERCICIO 2:
```sql
-- Actualizar el IBAN de una tarjeta de crédito
UPDATE credit_card 
SET iban = 'TR323456312213576817699999' 
WHERE id = 'CcU-2938';
```
EJEMPLO DE TU SPRINT 3 - EJERCICIO 3:
```sql
-- Insertar una nueva transacción
INSERT INTO transaction (id, credit_card_id, company_id, user_id, amount, declined) 
VALUES ('108B1D1D-5B23-A76C-55EF-C568E49A99DD', 'CcU-9999', 'b-9999', 9999, 111.11, 0);
```
EJEMPLO DE TU SPRINT 3 - EJERCICIO 4:
```sql
-- Eliminar una columna de una tabla
ALTER TABLE credit_card DROP COLUMN pan;
🧠 PATRONES COMUNES QUE VAS A USAR
```
INSERTAR DATOS CON SELECT:
```sql
-- Crear una copia de todas las transacciones aprobadas
INSERT INTO transactions_backup (company_id, amount, status)
SELECT company_id, amount, status
FROM transactions
WHERE status = 'approved';
```
ACTUALIZAR BASADO EN CÁLCULOS:
```sql
-- Aumentar todas las transacciones en un 10%
UPDATE transactions
SET amount = amount * 1.10
WHERE status = 'approved';
```
ELIMINAR DATOS DUPLICADOS:
```sql
-- Eliminar transacciones duplicadas (mismo company_id y amount)
DELETE t1 FROM transactions t1
INNER JOIN transactions t2 
WHERE t1.id < t2.id 
AND t1.company_id = t2.company_id 
AND t1.amount = t2.amount;
```
⚠️ LOS PELIGROS Y CÓMO EVITARLOS
ANTES DE DELETE, SIEMPRE HAZ SELECT:
```sql
-- PRIMERO: Ver qué vas a eliminar
SELECT * FROM transactions 
WHERE amount < 100;

-- LUEGO: Si estás seguro, eliminar
DELETE FROM transactions 
WHERE amount < 100;
```
USAR TRANSACCIONES PARA OPERACIONES CRÍTICAS:
```sql
-- Iniciar transacción (puedes deshacer si algo sale mal)
START TRANSACTION;

-- Tus operaciones
UPDATE company SET country = 'Spain' WHERE id = 1;
DELETE FROM transactions WHERE status = 'test';

-- Si todo está bien, confirmar
COMMIT;

-- Si algo salió mal, deshacer
ROLLBACK;
```
## 💡 EL CONSEJO MILLONARIO
"Siempre escribe el WHERE antes del DELETE o UPDATE - es tu seguro de vida contra desastres"

## TU CHECKLIST DE SEGURIDAD:
ANTES DE CUALQUIER OPERACIÓN:

✅ BACKUP - ¿Tienes una copia de seguridad?
✅ SELECT - ¿Verificaste qué registros afectarás?
✅ WHERE - ¿Incluiste la condición específica?
✅ TRANSACTION - ¿Usas transacción para operaciones críticas?

EJEMPLO DE BUENA PRÁCTICA:

```sql
-- 1. Primero ver
SELECT * FROM company WHERE country = 'Germany';

-- 2. Luego modificar (si el SELECT mostró lo correcto)
UPDATE company SET country = 'DE' WHERE country = 'Germany';

-- 3. Verificar el cambio
SELECT * FROM company WHERE country = 'DE';
```
## 🎯 TU NUEVO SUPERPODER
Ahora puedes no solo leer datos, sino también:

✅ Mantener tus tablas actualizadas con nuevos datos
✅ Corregir errores en datos existentes
✅ Limpiar información que ya no necesitas
✅ Automatizar procesos de actualización
✅ Preparar datos para análisis y reportes

Cada operación de escritura que realices te da control total sobre tu base de datos.

[← Carta 06: Subconsultas Básicas](carta_06_subconsultas.md) | [📚 Ir al Índice](INDICE_PRINCIPAL.md) | [Carta 08: Vistas →](carta_08_vistas.md)

¡PRIMERA CARTA DEL MAZO AVANZADO COMPLETADA! 🎉
Ahora controlas la lectura Y escritura de datos. Al siguiente nivel. 🚀

