import EscPosEncoder from "esc-pos-encoder";

export default function PrintFatura() {
  const encoder = new EscPosEncoder();

  const fatura = (data) => {
    encoder
      .initialize()
      .codepage("auto")
      .text("Factura")
      .text("--------------------------------------")
      .text("Cliente: " + data.cliente)
      .text("--------------------------------------")
      .text("Produto: " + data.produto)
      .text("Cobrança: " + data.pagamentoTotal)
      .text("Qt : " + data.quantidadeCliente)
      .text("--------------------------------------")
      .text("data: " + data.dataVenda)
      .newline()
      .qrcode("https://nielsleenheer.com")
      .encode();
  };

  return { fatura };
}
