<template>
  <q-layout>
    <q-page-container>
      <q-page padding>
        <div class="row">
          <p class="text-body1">Adicionar vendas</p>
          <q-space />
          <q-btn
            color="green-6"
            flat
            dense
            label="total de vendas: "
            no-caps
            icon="mdi-cart"
            size="md"
            @click="listaVendas"
          >
            <span class="text-red-10"> {{ totalVenda }}</span>
          </q-btn>
        </div>
        <q-separator />
        <q-form
          class="row justify-center q-gutter-sm q-mt-md"
          @submit.prevent="saveVendas"
        >
          <q-img
            class="col-3"
            :src="produto.imageUrl"
            style="max-width: 40px"
          ></q-img>
          <div class="col-3">
            <q-input
              dense
              type="text"
              label="Produto"
              disable
              v-model="produto.produto"
              color="green-10"
            ></q-input>
          </div>
          <div class="col-3">
            <q-input
              dense
              type="text"
              label="Preço Unit."
              disable
              v-model="produto.preco"
              @input="formatCurrency(produto.preco)"
            ></q-input>
          </div>
          <div class="col-3">
            <q-input
              dense
              type="text"
              label="Quantidade em Stock"
              disable
              v-model="produto.quantidade"
            ></q-input>
          </div>

          <div class="col-6 q-mt-lg">
            <q-input
              type="text"
              dense
              v-model="produto.cliente"
              outlined
              label="Nome do cliente"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-clipboard-account" />
              </template>
            </q-input>
          </div>
          <div class="col-6">
            <q-input
              type="text"
              dense
              v-model="produto.contacto"
              outlined
              label="Contácto"
              mask="(###) ### ###"
              unmasked-value
            >
              <template v-slot:prepend>
                <q-icon name="mdi-phone-classic" /> </template
            ></q-input>
          </div>
          <div class="col-6">
            <div class="row q-gutter">
              <div class="col-6">
                <q-input
                  type="text"
                  dense
                  v-model="produto.valorEntrada"
                  outlined
                  label="Valor de entrada"
                >
                  <template v-slot:prepend>
                    <q-icon name="mdi-cart-plus" />
                  </template>
                </q-input>
              </div>
              <q-space />
              <div class="col-3">
                <q-input
                  type="number"
                  dense
                  v-model="produto.quantidadeCliente"
                  outlined
                  label="Quantidade"
                  class="col-3"
                >
                  <template v-slot:prepend>
                    <q-icon name="mdi-numeric" />
                  </template>
                </q-input>
              </div>
            </div>
          </div>
          <div class="col-6" hidden>
            <q-input
              type="text"
              dense
              v-model="produto.resto"
              outlined
              label="Resto/Troco"
              disable
            >
              <template v-slot:prepend>
                <q-icon name="mdi-cart-minus" />
              </template>
            </q-input>
          </div>
          <div class="row col-6 q-mt-md">
            <span class="text-body2">
              Resto/Troco:
              <b class="text-red-4">{{
                formatCurrency(produto.resto)
              }}</b></span
            >
            <q-space />
            <span class="text-body2">
              Total:
              <b class="text-green-10">{{
                formatCurrency(produto.pagamento)
              }}</b></span
            >
          </div>
          <div class="col-6">
            <q-btn
              type="submit"
              dense
              color="green-5"
              outlined
              class="full-width"
              label="Salvar venda"
              icon="mdi-content-save-all"
            />
          </div>
        </q-form>

        <!-- Factura -->
        <div id="conteudoRelatorio" class="row q-mt-md" hidden>
          <div class="col-6">
            <p class="text-h3">Fatura</p>
            <p class="text-h5">Loja-LC</p>
            <p class="text-caption topMargin">
              Comercio e Prestação de serviço
            </p>
            <br />
            <p class="text-h6">Cobrar ao Senhor (a):</p>
            <p class="text-body1 topMargin">[ {{ produto.cliente }} ]</p>
          </div>
          <div class="col-6 text-right">
            <p>
              <q-img
                src="../../../public/icons/favicon-96x96.png"
                style="max-width: 20%"
              />
            </p>

            <p class="topMargin">
              <span class="text-h6">Fatura nº: {{ TotalFatura + 1 }}</span>
            </p>
            <p class="topMargin">
              <span class="text-h6">Data da Fatura: </span>
              {{ dataFatura }}
            </p>
          </div>

          <q-separator />
          <table
            class="q-mt-sm"
            style="
              width: 100%;
              font-family: 'Arial', sans-serif;
              font-size: 14px;
            "
          >
            <tr>
              <th>Produto</th>
              <th>Preço Unit.</th>
              <th>Qt.</th>
              <th>Total</th>
            </tr>
            <tr>
              <td>{{ produto.produto }}</td>
              <td>{{ formatCurrency(produto.preco) }}</td>
              <td>{{ produto.quantidadeCliente }}</td>
              <td>{{ formatCurrency(produto.pagamento) }}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td align="right" style="text-align: right"><b>Subtotal</b></td>
              <td>{{ formatCurrency(produto.pagamento) }}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td align="right" style="text-align: right"><b>IVA</b></td>
              <td>{{ formatCurrency(0) }}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td align="right" style="text-align: right"><b>Total</b></td>
              <td>{{ formatCurrency(produto.pagamento) }}</td>
            </tr>
          </table>

          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <q-separator />
          <table style="width: 100%">
            <tr>
              <td>Volte sempre</td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td>
                <p><b>Termos e condições</b></p>
                <p class="text-caption topMargin">Pagamento por prepago</p>
              </td>
            </tr>
          </table>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { defineComponent, ref, onMounted, watch } from "vue";
import { db } from "src/boot/localbase";
import { formatCurrency } from "./utils";
import { notification } from "src/utils/notify";
import { LocalStorage, useQuasar } from "quasar";
import html2pdf from "html2pdf.js";
//import jsPDF from "jspdf";
import { columnsFatura } from "./tableFatura";

export default defineComponent({
  setup() {
    const tabela = "produtos";
    const route = useRoute();
    const router = useRouter();
    const totalVenda = ref(0);
    const dataFatura = new Date().toJSON().slice(0, 10);
    const { notifyError, notifySuccess, notifyinfo } = notification();
    const $q = useQuasar();
    const TotalFatura = ref(0);
    const conteudoRelatorio = ref();
    const produtosVendas = ref([]);
    const produto = ref({
      produto_key: "",
      produto: "",
      preco: 0,
      quantidade: 0,
      pagamento: 0,
      quantidadeCliente: 1,
      imageUrl: "",
      cliente: "",
      contacto: "",
      valorEntrada: "",
      resto: 0,
      dataVenda: new Date().toJSON().slice(0, 10),
    });

    onMounted(() => {
      carregarOrdemFatuta();
      contarVendas();
      const key = route.params.key;
      carregarProd(key);
    });

    const contarVendas = async () => {
      try {
        const response = await db.collection("vendasRealizadas").get();
        totalVenda.value = response.length;
      } catch (error) {
        console.log(error.message);
      }
    };

    const carregarOrdemFatuta = async () => {
      try {
        const response = await db.collection("ordemFactura").get();
        console.log(response);
        TotalFatura.value = response.length;
      } catch (error) {
        console.log(error.message);
      }
    };

    const listaVendas = () => {
      router.push({ name: "listarVendas" });
    };

    watch(produto.value, (valor) => {
      // const valor1 = valor.valorEntrada;
      // const soma = valor1 - produto.value.preco;
      // produto.value.resto = soma;
      const valorProd = valor.preco * valor.quantidadeCliente;
      const valorResto = valor.valorEntrada - valor.pagamento;

      if (valor.valorEntrada != 0) {
        if (valor.pagamento > valor.valorEntrada) {
          produto.value.pagamento = valorProd;
          // notifyinfo(
          //   "O cliente não tem valor suficiente para pagar este produto"
          // );
          return;
        } else {
          if (valor.quantidadeCliente > valor.quantidade) {
            // notifyinfo(
            //   "A quantidade mensionada é superior da quantidade disponível em stock"
            // );
            return;
          } else {
            if (valorResto <= 0) {
              produto.value.resto = 0;
              return;
            }
            produto.value.resto = valor.valorEntrada - valor.pagamento;
            produto.value.pagamento = valorProd;
          }

          produtosVendas.value.push({
            produto: produto.value.produto,
            quantidade: produto.value.quantidadeCliente,
            preco: produto.value.preco,
            pagamento: produto.value.pagamento,
          });
          console.log(produtosVendas.value);
        }
      } else {
        //notifyinfo("Informe o valor que recebeu do cliente");
        produto.value.pagamento = valorProd;
      }
    });
    const carregarProd = async (key) => {
      try {
        const response = await db.collection(tabela).doc(key).get();
        produto.value.produto = response.produto;
        produto.value.preco = response.preco;
        produto.value.quantidade = response.quantidade;
        produto.value.quantidade = response.quantidade;
        produto.value.imageUrl = response.imageUrl.imageUrl;
        produto.value.produto_key = key;
      } catch (error) {
        console.log(error.message);
      } finally {
        $q.loading.hide();
      }
    };

    const saveVendas = async () => {
      try {
        if (produto.value.quantidadeCliente > produto.value.quantidade) {
          notifyinfo(
            "A quantidade mensionada é superior da quantidade disponível no stock!"
          );
          return;
        }

        if (produto.value.valorEntrada < produto.value.pagamento) {
          notifyinfo(
            "O valor que recebeu do cliente é menor que o preço total do produto!"
          );
          return;
        }

        const key = route.params.key;
        const qt = produto.value.quantidade - produto.value.quantidadeCliente;
        const userLocalStorage = LocalStorage.getItem("loja");

        $q.dialog({
          title: "Confirme",
          message: "Desejas imprimir fatura?",
          cancel: true,
          persistent: true,
        })
          .onOk(async () => {
            await db.collection("vendasRealizadas").add({
              produto: produto.value.produto,
              pago: produto.value.pagamento,
              preco: produto.value.preco,
              quantidade: produto.value.quantidadeCliente,
              cliente: produto.value.cliente,
              contacto: produto.value.contacto,
              funcionario: userLocalStorage,
              data: produto.value.dataVenda,
            });

            await db.collection("ordemFactura").add({
              produto: produto.value.produto,
              cliente: produto.value.cliente,
              pago: produto.value.pagamento,
              data: produto.value.dataVenda,
            });

            await db.collection(tabela).doc(key).update({
              quantidade: qt,
            });
            contarVendas();
            carregarOrdemFatuta();
            carregarProd(produto.value.produto_key);
            notifySuccess("Produto vendido com sucesso...!");
            printPdf();
          })
          .onOk(() => {
            // console.log('>>>> second OK catcher')
          })
          .onCancel(async () => {
            await db.collection("vendasRealizadas").add({
              produto: produto.value.produto,
              pago: produto.value.pagamento,
              preco: produto.value.preco,
              quantidade: produto.value.quantidadeCliente,
              cliente: produto.value.cliente,
              contacto: produto.value.contacto,
              funcionario: userLocalStorage,
              data: produto.value.dataVenda,
            });

            await db.collection(tabela).doc(key).update({
              quantidade: qt,
            });
            contarVendas();
            carregarProd(produto.value.produto_key);
            notifySuccess("Produto vendido com sucesso...!");
          })
          .onDismiss(() => {
            // console.log('I am triggered on both OK and Cancel')
          });
      } catch (error) {
        console.log(error.message);
      } finally {
      }
    };

    const printPdf = async () => {
      const content = document.querySelector("#conteudoRelatorio");
      var opt = {
        margin: 1,
        filename: "fatura.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      html2pdf()
        .from(content)
        .outputPdf((pdf) => {
          const fatura = pdf.output("fatura");
          const blobUrl = URL.createObjectURL(fatura);

          // Exibe o PDF em uma nova janela ou guia
          window.open(blobUrl, "_blank");
        }, opt);

      html2pdf().set(opt).from(content).save();
    };

    return {
      tabela,
      route,
      produto,
      carregarProd,
      saveVendas,
      formatCurrency,
      contarVendas,
      totalVenda,
      listaVendas,
      conteudoRelatorio,
      printPdf,
      columnsFatura,
      dataFatura,
      TotalFatura,
      carregarOrdemFatuta,
    };
  },
});
</script>

<style lang="css" scoped>
.tabela,
th,
td {
  border-collapse: collapse; /*define a separação entre as bordar*/
  padding: 5px;
  text-align: left;
  width: 50px;
}
th {
  background-color: lightgray;
}

.topMargin {
  margin-top: -5px;
}
</style>
