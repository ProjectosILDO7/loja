import { formatCurrency } from "./utils";
const columns = [
  {
    name: "img_url",
    field: "img_url",
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
    label: "Categoria a que pertence",
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
    label: "Imposto IVA",
    sortable: true,
    align: "left",
    format: (val) => formatCurrency(val),
  },
  {
    name: "data",
    field: "data",
    label: "Data de registro",
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
