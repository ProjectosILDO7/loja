<template>
  <q-page padding>
    <span class="text-body">Pagina Inicial</span>
    <q-separator />
    <div class="row q-gutter-sm q-mt-sm flex flex-justify">
      <div class="col-3">
        <cards-page
          tabela="categorias"
          color="green-10"
          icon="mdi-shape-plus"
          label="Categorias"
        />
      </div>
      <div class="col-3">
        <cards-page
          tabela="produtos"
          color="red-10"
          icon="mdi-basket-plus"
          label="Produtos"
        />
      </div>
      <div class="col-3">
        <cards-page
          tabela="vendasRealizadas"
          color="blue-grey-10"
          icon="mdi-cart"
          label="Vendas realizadas"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import cardsPage from "./cardsPage.vue";
import { LocalStorage } from "quasar";
import { useRouter } from "vue-router";
import { notification } from "src/utils/notify";
export default defineComponent({
  name: "IndexPage",
  components: { cardsPage },
  setup() {
    const acesso = ref(false);
    const router = useRouter();
    const { notifyError, notifyinfo } = notification();

    onMounted(() => {
      if (LocalStorage.getItem("acessp") != "admin") {
        notifyinfo("Caro funcionário, existem área de acesso exclusivo!.");
        router.push({ name: "vendas" });
      }
    });
    return {};
  },
});
</script>
