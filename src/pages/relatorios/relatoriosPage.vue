<template>
  <q-layout>
    <q-page-container>
      <q-page padding>
        <p class="text-body1">Relatorios</p>
        <q-separator />
        <div class="row">
          <div class="col-4">
            <span class="primary q-mt-sm"
              ><b>Busque vendas realizadas por dia específico</b></span
            >
            <q-date
              flat
              v-model="date.date"
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
              :filter="date.date"
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
              <template v-slot:top>
                <div class="q-gutter-sm">
                  <q-input
                    outlined
                    dense
                    type="text"
                    label="Imforme o ano"
                    v-model="date.searchAno"
                  ></q-input>

                  <q-select
                    outlined
                    dense
                    v-model="date.searchMes"
                    :options="meses"
                    label="Busque o mês"
                    option-value="id"
                    emit-value
                    map-options
                    option-label="mes"
                  />
                </div>
              </template>
            </q-table>
          </div>
        </div>
        <q-separator />
        <div class="row">
          <div class="col-4 q-mt-sm">
            <span class=""
              >Data selecionada: <b>{{ date.date }}</b></span
            >
          </div>
          <q-space />
          <div class="q-gutter-sm q-mt-sm">
            <span class=""
              >Total de Imposto:
              <b class="text-red-8">{{ formatCurrency(totalImposto) }}</b></span
            >
            <span class=""
              >Ganhos obtidos:
              <b class="text-green-8">{{ formatCurrency(total) }}</b></span
            >
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
import { ref, onMounted, watch } from "vue";
import { columns } from "./table";
import { formatCurrency } from "src/utils/formatNumber";
import { db } from "src/boot/localbase";
import { useQuasar, LocalStorage } from "quasar";
import { notification } from "src/utils/notify";
import { useRouter } from "vue-router";

export default {
  setup() {
    const tabela = "vendasRealizadas";
    const $q = useQuasar();
    const { notifyError, notifySuccess, notifyinfo } = notification();
    const total = ref(0);
    const router = useRouter();
    const totalImposto = ref(0);
    const rows = ref([]);
    const date = ref({
      searchAno: "",
      searchMes: "",
      date: "",
    });
    const meses = ref([
      { id: "-01", mes: "Janeiro" },
      { id: "-02", mes: "Fevereiro" },
      { id: "-03", mes: "Março" },
      { id: "-04", mes: "Abril" },
      { id: "-05", mes: "Maio" },
      { id: "-06", mes: "Junho" },
      { id: "-07", mes: "Julho" },
      { id: "-08", mes: "Agosto" },
      { id: "-09", mes: "Setembro" },
      { id: "-10", mes: "Outubro" },
      { id: "-11", mes: "Novembro" },
      { id: "-12", mes: "Dezembro" },
    ]);
    const searchAno = ref("");
    const searchMes = ref("");
    onMounted(async () => {
      carregarVendas();
      valorT();
      if (LocalStorage.getItem("acesso") != "admin") {
        notifyinfo("Caro funcionário, existem área de acesso exclusivo!.");
        router.push({ name: "vendas" });
      }
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

    watch(date.value, (data) => {
      try {
        db.collection(tabela)
          .get()
          .then((itens) => {
            const result = itens.filter((item) => item.data == data.date);
            total.value = 0;
            totalImposto.value = 0;
            for (let index = 0; index < result.length; index++) {
              const element = result[index];
              total.value += element.pago;
              totalImposto.value += element.impostoIVA;
            }
          });
      } catch (error) {
        console.log(error.message);
      }

      if (data.searchMes) {
        data.date = data.searchAno + data.searchMes;
        try {
          db.collection(tabela)
            .get()
            .then((itens) => {
              const result = itens.filter((item) => item.mesAno == data.date);
              total.value = 0;
              totalImposto.value = 0;
              for (let index = 0; index < result.length; index++) {
                const element = result[index];
                total.value += element.pago;
                totalImposto.value += element.impostoIVA;
              }
            });
        } catch (error) {
          console.log(error.message);
        }
      }
    });

    const handleSelectChange = async (value) => {
      date.value = searchAno.value + value;
      const response = await db
        .collection(tabela)
        .get()
        .then((item) => item.filter((item) => item.mesAno == date.value));

      for (let index = 0; index < response.length; index++) {
        const element = response[index];
        total.value += parseInt(element.pago);
        totalImposto.value += parseInt(element.impostoIVA);
      }
    };

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
          totalImposto.value += element.impostoIVA;
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
      totalImposto,
      searchAno,
      searchMes,
      meses,
      handleSelectChange,
    };
  },
};
</script>
