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

        <q-toolbar-title>
          <span v-if="brand.name">
            <span class="q-ml-sm">{{ brand.name }}</span></span
          >
          <span v-else> <span class="q-ml-sm">Loja && Stock</span></span>
        </q-toolbar-title>

        <darkmode-change />
        <q-btn-dropdown
          flat
          icon="person"
          :label="user"
          v-if="user && $q.platform.is.desktop"
        >
          <q-list>
            <!-- <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label
                  ><q-avatar icon="mdi-account" /> Perfil
                </q-item-label>
              </q-item-section>
            </q-item> -->

            <q-item
              clickable
              v-close-popup
              @click="addFuncionarios"
              v-if="acesso"
            >
              <q-item-section>
                <q-item-label
                  ><q-avatar icon="mdi-account-tie" /> Funcionários
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="formConfig">
              <q-item-section>
                <q-item-label
                  ><q-avatar icon="mdi-cog" /> Configurações</q-item-label
                >
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup @click="logoutPage">
              <q-item-section>
                <q-item-label><q-avatar icon="mdi-logout" />Sair</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
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
import { defineComponent, ref, onMounted } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import useApi from "src/composible/userApi";
import darkmodeChange from "src/components/darkMode/darkMode.vue";

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
import { db } from "src/boot/localbase";
import { useRouter } from "vue-router";
import { LocalStorage, useQuasar } from "quasar";

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
    darkmodeChange,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const { brand, getBrand } = useApi();
    const user = ref("");
    const router = useRouter();
    const acesso = ref(false);
    const idUser = ref("");
    const $q = useQuasar();
    onMounted(() => {
      getBrand();
      //CarregarUser();
      if (LocalStorage.getItem("acesso") != "admin") {
        acesso.value = false;
        user.value = LocalStorage.getItem("loja");
      } else {
        acesso.value = true;
        user.value = LocalStorage.getItem("loja");
      }
    });

    const formConfig = () => {
      router.push({ name: "configs" });
    };

    const addFuncionarios = () => {
      router.push({ name: "addFuncionarios" });
    };

    // const CarregarUser = async () => {
    //   try {
    //     const userName = await db
    //       .collection("users")
    //       .get()
    //       .then((item) => item.filter((data) => data.status == 1));
    //     idUser.value = userName[0].email;
    //     if (userName.length > 0) {
    //       user.value = userName[0].name;
    //     } else {
    //       router.push({ name: "login" });
    //     }
    //   } catch (error) {
    //     console.log(error.message);
    //   }
    // };

    const logoutPage = async () => {
      const email = LocalStorage.getItem("loja");
      if (email != null) {
        $q.loading.show();
        await LocalStorage.clear("loja");
        router.push({ name: "" });
        location.reload();
        $q.loading.hide();
        window.close();
      }
    };

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      brand,
      user,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      formConfig,
      addFuncionarios,
      idUser,
      logoutPage,
      acesso,
    };
  },
});
</script>
