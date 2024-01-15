<template>
  <q-layout>
    <q-page-container>
      <q-page padding>
        <div class="row">
          <p class="text-body1">Vendas Realizadas</p>
          <q-space />
          <q-btn
            dense
            size="sm"
            flat
            label="Total em caixa:  "
            icon="mdi-cart"
            no-caps
          >
            <span class="text-green-10 q-ml-sm">
              <b>{{ formatCurrency(valorTotal) }}</b>
            </span>
          </q-btn>
        </div>
        <q-separator />
        <q-table
          dense
          flat
          :rows="rows"
          :columns="columns"
          row-key="name"
          :filter="filter"
        >
          <template v-slot:top>
            <q-input
              dense
              outlined
              type="text"
              label="pesquisar venda"
              v-model="filter"
              hint="Se for pesquisar data: Ex. 2024-1-13"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-magnify" />
              </template>
            </q-input>
            <q-space />
            <download-excel
              :data="rows"
              :fields="fields"
              worksheet="Vendas"
              name="Planilha-de-vendas-realizadas.xls"
              :before-generate="startDownload"
              :before-finish="finishDownload"
            >
              <q-btn outline dense icon="mdi-download" color="green-10" />
            </download-excel>
          </template>

          <template v-slot:body-cell-cliente="props">
            <q-td :props="props">
              <span v-if="props.row.cliente">{{ props.row.cliente }}</span>
              <span v-else class="text-red-10 text-body3"
                >Sem dados do cliente</span
              >
            </q-td>
          </template>

          <template v-slot:body-cell-contacto="props">
            <q-td :props="props">
              <span v-if="props.row.contacto">{{ props.row.contacto }}</span>
              <span v-else class="text-red-10 text-body3">Sem nº de tel.</span>
            </q-td>
          </template>

          <template v-slot:body-cell-options="props">
            <q-td :props="props">
              <div class="q-gutter-sm">
                <q-btn
                  flat
                  size="sm"
                  dense
                  icon="mdi-delete"
                  color="red-10"
                  title="Apagar registro"
                  @click="deleteVenda(props.row.key)"
                />
                <q-btn
                  flat
                  size="sm"
                  dense
                  icon="mdi-account-tie"
                  color="blue-grey-10"
                  title="Ver funcionario"
                  @click="showDetail(props.row)"
                />
              </div>
            </q-td>
          </template>
        </q-table>

        <q-dialog v-model="show">
          <q-card class="my-card">
            <q-card-section>
              <div class="row no-wrap items-center">
                <div class="col text-h6 ellipsis">
                  <q-avatar icon="mdi-account-tie" />
                  {{ detalhesFuncionario.nome }}
                </div>
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <div class="text-subtitle1">
                Valor recebido:
                {{ formatCurrency(detalhesFuncionario.valorPago) }}
              </div>
              <div class="text-caption text-grey">
                Produto vendido: <b>{{ detalhesFuncionario.produto }}</b
                >, Data/Hora da realização da venda:
                <b>{{ detalhesFuncionario.data }}</b>
              </div>
            </q-card-section>

            <q-separator />

            <q-card-actions align="right">
              <q-btn
                v-close-popup
                flat
                color="primary"
                label="Fechar"
                icon="mdi-close"
                no-caps
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { db } from "src/boot/localbase";
import { columns } from "./tableVendas";
import { formatCurrency } from "../produtos/utils";
import { useQuasar } from "quasar";
import { notification } from "src/utils/notify";
import JsonExcel from "vue-json-excel3";
import { fields } from "./fieldsExport";
export default {
  components: { downloadExcel: JsonExcel },
  setup() {
    const $q = useQuasar();
    const { notifyError, notifySuccess, notifyinfo } = notification();
    const rows = ref([]);
    const filter = ref("");
    const valorTotal = ref(0);
    const show = ref(false);
    const tabela = "vendasRealizadas";

    const detalhesFuncionario = ref({
      nome: "",
      produto: "",
      data: "",
      valorPago: "",
    });

    onMounted(() => {
      carregarVendas();
      valorT();
    });

    const startDownload = () => {
      $q.loading.show();
    };

    const finishDownload = () => {
      $q.loading.hide();
    };

    const showDetail = (itens) => {
      show.value = true;
      detalhesFuncionario.value.nome = itens.funcionario;
      detalhesFuncionario.value.produto = itens.produto;
      detalhesFuncionario.value.data = itens.data;
      detalhesFuncionario.value.valorPago = itens.pago;
    };

    const valorT = async () => {
      try {
        const response = await db.collection(tabela).get();
        valorTotal.value = 0;
        for (let index = 0; index < response.length; index++) {
          const element = response[index];
          valorTotal.value += element.pago;
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const deleteVenda = async (id) => {
      try {
        $q.dialog({
          title: "Confirme",
          message: "Tens a certeza que queres apagar este registro?",
          cancel: true,
          persistent: true,
        })
          .onOk(async () => {
            await db.collection(tabela).doc(id).delete();
            notifySuccess("Registro apagado com sucesso");
            carregarVendas();
            valorT();
          })
          .onCancel(() => {
            // console.log('Cancel')
          })
          .onDismiss(() => {
            // console.log('I am triggered on both OK and Cancel')
          });
      } catch (error) {
        console.log(error.message);
      }
    };

    const carregarVendas = async () => {
      try {
        const response = await db.collection(tabela).get({ keys: true });

        rows.value = response.map((itens) => {
          return {
            ...itens.data,
            key: itens.key,
          };
        });
      } catch (error) {}
    };
    return {
      columns,
      rows,
      carregarVendas,
      valorTotal,
      valorT,
      filter,
      formatCurrency,
      deleteVenda,
      showDetail,
      show,
      detalhesFuncionario,
      startDownload,
      finishDownload,
      fields,
    };
  },
};
</script>
