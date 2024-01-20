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
            <div class="text-body2">
              Subtotal:
              <b class="text-green-10">{{
                formatCurrency(produto.pagamento)
              }}</b>
              <br />
              <span class="text-body2"> IVA: {{ formatCurrency(valIva) }}</span>
              <br />
              <span class="text-body2"
                ><b>TOTAL: </b>{{ formatCurrency(pagamentoTotal) }}</span
              >
            </div>
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

import faturacao from "./printFatura";

export default defineComponent({
  //components: {  },
  setup() {
    const tabela = "produtos";
    const route = useRoute();
    const router = useRouter();
    const totalVenda = ref(0);
    const dataFatura = new Date().toJSON().slice(0, 10);
    const { notifyError, notifySuccess, notifyinfo } = notification();
    const $q = useQuasar();
    const { fatura } = faturacao();
    const TotalFatura = ref(0);

    const valIva = ref(0);
    const pagamentoTotal = ref(0);
    const conteudoRelatorio = ref();
    const produtosVendas = ref([]);
    const produto = ref({
      produto_key: "",
      produto: "",
      preco: 0,
      quantidade: 0,
      pagamento: 0,
      pagamentoTotal: pagamentoTotal.value,
      impostIVA: 0,
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
            produto.value.resto = valor.valorEntrada - pagamentoTotal.value;
            produto.value.pagamento = valorProd;
            valIva.value = (5 / 100) * produto.value.pagamento;
            pagamentoTotal.value = valIva.value + produto.value.pagamento;
          }

          produtosVendas.value.push({
            produto: produto.value.produto,
            quantidade: produto.value.quantidadeCliente,
            preco: produto.value.preco,
            pagamento: produto.value.pagamento,
          });
        }
      } else {
        //notifyinfo("Informe o valor que recebeu do cliente");
        produto.value.pagamento = valorProd;
        valIva.value = (5 / 100) * produto.value.pagamento;
        pagamentoTotal.value = valIva.value + produto.value.pagamento;
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

        if (produto.value.valorEntrada < pagamentoTotal.value) {
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
              pago: pagamentoTotal.value,
              impostoIVA: valIva.value,
              preco: produto.value.preco,
              quantidade: produto.value.quantidadeCliente,
              cliente: produto.value.cliente,
              contacto: produto.value.contacto,
              funcionario: userLocalStorage,
              data: produto.value.dataVenda,
              mesAno: produto.value.dataVenda.slice(0, 7),
            });

            await db.collection("ordemFactura").add({
              produto: produto.value.produto,
              cliente: produto.value.cliente,
              pago: pagamentoTotal.value,
              data: produto.value.dataVenda,
            });

            await db.collection(tabela).doc(key).update({
              quantidade: qt,
            });
            contarVendas();
            carregarOrdemFatuta();
            carregarProd(produto.value.produto_key);
            notifySuccess("Produto vendido com sucesso...!");
            fatura(produto.value);
          })
          .onOk(() => {
            // console.log('>>>> second OK catcher')
          })
          .onCancel(async () => {
            await db.collection("vendasRealizadas").add({
              produto: produto.value.produto,
              pago: pagamentoTotal.value,
              impostoIVA: valIva.value,
              preco: produto.value.preco,
              quantidade: produto.value.quantidadeCliente,
              cliente: produto.value.cliente,
              contacto: produto.value.contacto,
              funcionario: userLocalStorage,
              data: produto.value.dataVenda,
              mesAno: produto.value.dataVenda.slice(0, 7),
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
      dataFatura,
      TotalFatura,
      carregarOrdemFatuta,
      valIva,
      pagamentoTotal,
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
