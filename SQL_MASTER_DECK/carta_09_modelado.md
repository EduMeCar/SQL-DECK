# CARTA 09: MODELADO DE DATOS 🏛

**Nivel:** 🟡 Core | **Tiempo:** 25-30 min | **Prerequisito:** Cartas 01-08

## 🎯 OBJETIVO

Entender claves primarias (PK), claves foráneas (FK) y cómo se estructuran las relaciones en BD.

## 🎯 LO ESENCIAL

**Clave primaria (PK)**: Identifica únicamente cada fila  
**Clave foránea (FK)**: Conecta a otra tabla  
**Relaciones**: 1-a-muchos, muchos-a-muchos  

Un modelo bien diseñado hace queries posibles y eficientes.

## 💻 ESTRUCTURA BASE

```sql
CREATE TABLE company (
  id INT PRIMARY KEY,
  name VARCHAR(100)
);

CREATE TABLE transactions (
  id INT PRIMARY KEY,
  company_id INT,
  amount DECIMAL,
  FOREIGN KEY (company_id) REFERENCES company(id)
);
```

## 🚀 VARIANTES

**1-a-muchos (1:N)**: 1 empresa → MUCHAS transacciones  
**Muchos-a-muchos (N:N)**: Tabla intermedia (junction table)  

## 📚 EJERCICIOS

### Ejercicio 1: Identificar relaciones
```sql
DESCRIBE company;
DESCRIBE transactions;
```

### Ejercicio 2: Por qué funciona el JOIN
```sql
SELECT c.name, t.amount
FROM company c
JOIN transactions t ON c.id = t.company_id;
```

## 💡 REGLAS DE ORO

**✅ Bien:**
- Cada tabla tiene PK única
- FKs respetan integridad
- Sin duplicados
- Nombres claros: `user_id`, `product_id`

**❌ Evita:**
- Tablas sin PK
- FKs huérfanas
- Duplicación de datos
- Nombres ambiguos: `id1`, `id2`

## 🔗 PRÓXIMO PASO

**Carta 10: Análisis avanzado** → Métricas, KPIs, Business intelligence.

[← Volver al Índice](./INDICE_PRINCIPAL.md) | [Carta 10: Análisis →](./carta_10_analisis.md)
