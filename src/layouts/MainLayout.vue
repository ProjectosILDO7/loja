<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Loja </q-toolbar-title>

        <div>Ola loja</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Menu </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
// const linksList = [
//   {
//     title: "Home",
//     caption: "Painel inicial",
//     icon: "mdi-home",
//     routeName: "admin",
//   },
//   {
//     title: "Categorias",
//     caption: "Cadastro de categorias de produtos",
//     icon: "mdi-shape-plus",
//     routeName: "categorias",
//   },
//   {
//     title: "Produtos",
//     caption: "Cadastro de produtos",
//     icon: "mdi-basket-plus",
//     routeName: "produtos",
//   },
//   {
//     title: "Vendas",
//     caption: "Realiza vendas",
//     icon: "mdi-cart-arrow-up",
//     routeName: "vendas",
//   },
//   {
//     title: "Relatórios",
//     caption: "Gerar relatórios de vendas",
//     icon: "mdi-file-table",
//     routeName: "relatorios",
//   },
//   {
//     title: "Configurações",
//     caption: "Configurações da loja",
//     icon: "mdi-cog",
//     routeName: "configs",
//   },
// ];
import { linksList } from "./Links.js";
export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
