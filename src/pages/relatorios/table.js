import { formatCurrency } from "src/utils/formatNumber";
const columns = [
  {
    name: "produto",
    field: "produto",
    label: "Produto comprado.",
    sortable: true,
    align: "left",
  },
  {
    name: "preco",
    field: "preco",
    label: "Preç.Unit",
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
    name: "pago",
    field: "pago",
    label: "Total pago",
    sortable: true,
    align: "left",
    format: (val) => formatCurrency(val),
  },
  {
    name: "data",
    field: "data",
    label: "Data da venda",
    sortable: true,
    align: "left",
  },

  {
    name: "options",
    field: "options",
    label: "Opções",
    align: "left",
  },
];
export { columns };
