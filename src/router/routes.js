const routes = [
  {
    path: "/admin",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "admin",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        path: "/categorias/:key?",
        name: "categorias",
        component: () => import("pages/categorias/categoriaPage.vue"),
      },
      {
        path: "/edit-form/:key?",
        name: "editFormCategoria",
        component: () => import("pages/categorias/editFormCategoria.vue"),
      },
      {
        path: "/produtos",
        name: "produtos",
        component: () => import("pages/produtos/produtosPage.vue"),
      },
      {
        path: "/vendas",
        name: "vendas",
        component: () => import("pages/vendas/vendasPage.vue"),
      },
      {
        path: "/addVendas/:key?",
        name: "addVendas",
        component: () => import("pages/vendas/addVendas.vue"),
      },
      {
        path: "/relatorios",
        name: "relatorios",
        component: () => import("pages/relatorios/relatoriosPage.vue"),
      },
      {
        path: "/config",
        name: "configs",
        component: () => import("pages/config/configPage.vue"),
      },
    ],
  },

  {
    path: "/",
    component: () => import("src/layouts/HomeLayout.vue"),
    children: [
      {
        path: "",
        name: "login",
        component: () => import("src/pages/home/loginPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
