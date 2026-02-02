/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a set of docs in the sidebar
 - provide next/previous navigation

 The sidebars can be generated from the file structure, or explicitly defined here.

 Create as many sidebars as you want.
 */

module.exports = {
  tutorialSidebar: [
    'intro',
    {
      label: 'Cartas SQL-DECK',
      items: [
        'cartas/carta_01_select_basico',
        'cartas/carta_02_where_condiciones',
        'cartas/carta_03_operadores_logicos',
        'cartas/carta_04_funciones_basicas',
        'cartas/carta_05_group_by',
        'cartas/carta_06_joins',
        'cartas/carta_07_subconsultas',
        'cartas/carta_08_insert_update_delete',
        'cartas/carta_09_indices_optimizacion',
        'cartas/carta_10_analisis_avanzado',
      ],
    },
  ],
};
