import { formatCurrency } from "./utils";
const columnsFatura = [
  {
    name: "produto",
    field: "produto",
    label: "Produto",
    sortable: true,
    align: "left",
  },
  {
    name: "quantidadeCliente",
    field: "quantidadeCliente",
    label: "Qt",
    sortable: true,
    align: "left",
  },
  {
    name: "preco",
    field: "preco",
    label: "Preço",
    sortable: true,
    align: "left",
    format: (val) => formatCurrency(val),
  },
  {
    name: "pagamento",
    field: "pagamento",
    label: "Pago",
    sortable: true,
    align: "left",
    format: (val) => formatCurrency(val),
  },
];
export { columnsFatura };
