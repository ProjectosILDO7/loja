<template>
  <q-layout>
    <q-page-container>
      <q-page padding>
        <p class="text-body1">Loja</p>
        <q-separator />
        <div class="q-pa-md">
          <q-table
            flat
            bordered
            grid
            title="Produtos no Stock"
            :rows="rows"
            :columns="columns"
            row-key="name"
            :filter="filter"
            hide-header
          >
            <template v-slot:top-right>
              <div class="q-gutter-y-sm">
                <q-input
                  borderless
                  outlined
                  dense
                  debounce="300"
                  v-model="filter"
                  placeholder="Buscar produto"
                >
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>

                <q-select
                  dense
                  outlined
                  v-model="form.find"
                  :options="categorias"
                  label="Busque por categoria"
                  option-value="id"
                  option-label="categoria"
                  map-options
                  emit-value
                  class="q-mt-sm"
                >
                  <template v-slot:prepend>
                    <q-icon name="mdi-shape-plus" />
                  </template>
                </q-select>
              </div>
            </template>

            <template v-slot:item="props">
              <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
                <q-card flat bordered>
                  <q-card-section class="text-center">
                    <q-img :src="props.row.img_url" style="max-width: 80px" />
                    <br />
                    <strong>{{ props.row.produto }}</strong>
                  </q-card-section>
                  <q-separator />
                  <q-card-section
                    class="flex flex-center"
                    :style="{ fontSize: props.row.calories / 2 + 'px' }"
                  >
                    <div>
                      Preço:
                      <span class="text-green-10">{{
                        formatCurrency(props.row.preco)
                      }}</span>
                    </div>
                  </q-card-section>
                  <q-card-section class="q-mt-sm">
                    <div>Quant.: {{ props.row.quantidade }}</div>
                  </q-card-section>
                  <q-card-section class="q-mt-sm text-right">
                    <q-btn
                      outline
                      color="green-8"
                      dense
                      label="Adicionar a venda"
                      icon="mdi-cart-plus"
                      no-caps
                      @click="addVenda(props.row)"
                    />
                  </q-card-section>
                </q-card>
              </div>
            </template>
          </q-table>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { columns } from "./table.js";
import { ref, onMounted, watch } from "vue";
import { Notify } from "quasar";
import { db } from "src/boot/localbase";
import { formatCurrency } from "./utils";
import { useRouter } from "vue-router";
import { notification } from "src/utils/notify";

export default {
  name: "pageVendas",
  setup() {
    const rows = ref([]);
    const categorias = ref([]);
    const loading = ref(false);
    const tabela = "produtos";
    const filter = ref("");
    const { notifySuccess, notifyError, notifyinfo } = notification();
    const router = useRouter();
    const form = ref({
      find: "",
    });

    watch(form.value, (result) => {
      filter.value = result.find.categoria;
    });

    onMounted(() => {
      carregarInfo();
      carregarInfoCateg();
    });

    const addVenda = (key) => {
      if (key.quantidade > 0) {
        router.push({ name: "addVendas", params: { key: key.key } });
      } else {
        notifyinfo("Este produto já não tem no Stock, Precisas adquerir!");
      }
    };
    const carregarInfo = async () => {
      try {
        loading.value = true;
        const response = await db.collection(tabela).get({ keys: true });
        rows.value = response.map((resp) => {
          return {
            ...resp.data,
            key: resp.key,
          };
        });
      } catch (error) {
        notifyError(error.message);
      } finally {
        loading.value = false;
      }
    };

    const carregarInfoCateg = async () => {
      try {
        loading.value = true;
        const response = await db.collection("categorias").get({ keys: true });
        categorias.value = response.map((resp) => {
          return {
            ...resp.data,
            key: resp.key,
          };
        });
      } catch (error) {
        notifyError(error.message);
      } finally {
        loading.value = false;
      }
    };
    return {
      columns,
      carregarInfo,
      filter,
      rows,
      categorias,
      carregarInfoCateg,
      form,
      formatCurrency,
      addVenda,
    };
  },
};
</script>
