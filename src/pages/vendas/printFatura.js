import EscPosEncoder from "esc-pos-encoder";

export default function PrintFatura() {
  const encoder = new EscPosEncoder();

  const fatura = (data) => {
    encoder
      .initialize()
      .codepage("auto")
      .text("Factura")
      .newline()
      .text("--------------------------------------")
      .text("Cliente: " + data.cliente)
      .newline()
      .text("--------------------------------------")
      .text("Produto: " + data.produto)
      .newline()
      .text("Cobrança: " + data.pagamentoTotal)
      .newline()
      .text("Qt : " + data.quantidadeCliente)
      .text("--------------------------------------")
      .newline()
      .text("data: " + data.dataVenda)
      .newline()
      .qrcode("https://nielsleenheer.com")
      .encode();
  };

  console.log(fatura);

  return { fatura };
}
