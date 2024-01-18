import { formatCurrency } from "./utils";
const columns = [
  {
    name: "img_url",
    required: true,
    label: "Dessert (100g serving)",
    field: (row) => row.name,
    label: "Imagem",
    sortable: true,
    align: "left",
  },
  {
    name: "produto",
    field: "produto",
    label: "nome de produto",
    sortable: true,
    align: "left",
  },
  {
    name: "categoria",
    field: "categoria",
    label: "Categoria pertencente",
    sortable: true,
    align: "left",
  },
  {
    name: "quantidade",
    field: "quantidade",
    label: "Quant.",
    sortable: true,
    align: "left",
  },
  {
    name: "preco",
    field: "preco",
    label: "Preço unitário",
    sortable: true,
    align: "left",
    format: (val) => formatCurrency(val),
  },
  {
    name: "impostoIVA",
    field: "impostoIVA",
    label: "Imposto",
    sortable: true,
    align: "left",
    format: (val) => formatCurrency(val),
  },
  {
    name: "valorAcrescentado",
    field: "valorAcrescentado",
    label: "Preço total",
    sortable: true,
    align: "left",
    format: (val) => formatCurrency(val),
  },

  {
    name: "options",
    field: "options",
    label: "Opções",
    align: "left",
  },
];
export { columns };
