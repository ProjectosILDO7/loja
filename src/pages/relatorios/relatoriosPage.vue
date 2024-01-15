<template>
  <q-layout>
    <q-page-container>
      <q-page padding>
        <p class="text-body1">Relatorios</p>
        <q-separator />
        <div class="row">
          <div class="col-4">
            <span class="text-blue-10 q-mt-sm"
              ><b>Busque vendas realizadas por data Específica</b></span
            >
            <q-date
              flat
              v-model="date"
              minimal
              today-btn
              mask="YYYY-MM-DD"
              color="primary"
              text-color="white"
              square
            />
          </div>

          <div class="col-8" v-if="rows">
            <q-table
              flat
              dense
              :rows="rows"
              :columns="columns"
              :filter="date"
              row-key="name"
            >
              <template v-slot:body-cell-options="props">
                <q-td :props="props">
                  <q-btn
                    dense
                    flat
                    icon="mdi-delete"
                    size="sm"
                    color="red-10"
                    @click="deleteProduto(props.row.key)"
                  />
                </q-td>
              </template>
            </q-table>
          </div>
        </div>
        <q-separator />
        <div class="row">
          <div class="col-4">
            <span class=""
              >Data selecionada: <b>{{ date }}</b></span
            >
          </div>
          <q-space />
          <span class="text-body1"
            >Ganhos obtidos: <b>{{ formatCurrency(total) }}</b></span
          >
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
import { ref, onMounted, watch } from "vue";
import { columns } from "./table";
import { formatCurrency } from "../produtos/utils";
import { db } from "src/boot/localbase";
import { useQuasar } from "quasar";
import { notification } from "src/utils/notify";

export default {
  setup() {
    const tabela = "vendasRealizadas";
    const $q = useQuasar();
    const { notifyError, notifySuccess, notifyinfo } = notification();
    const total = ref(0);
    const rows = ref([]);
    const date = ref("");
    onMounted(async () => {
      carregarVendas();
      valorT();
    });

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

    watch(date, (data) => {
      try {
        db.collection(tabela)
          .get()
          .then((itens) => {
            const result = itens.filter((item) => item.data == data);
            total.value = 0;
            for (let index = 0; index < result.length; index++) {
              const element = result[index];
              total.value += element.pago;
            }
          });
      } catch (error) {
        console.log(error.message);
      }
    });

    const deleteProduto = (key) => {
      try {
        $q.dialog({
          title: "Confirme",
          message: "Tens a certeza que queres apagar este registro?",
          cancel: true,
          persistent: true,
        })
          .onOk(async () => {
            await db.collection(tabela).doc(key).delete();
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

    const valorT = async () => {
      try {
        const response = await db.collection(tabela).get();
        total.value = 0;
        for (let index = 0; index < response.length; index++) {
          const element = response[index];
          total.value += element.pago;
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    return {
      date,
      columns,
      rows,
      formatCurrency,
      total,
      valorT,
      deleteProduto,
    };
  },
};
</script>
