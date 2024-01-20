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
        path: "/produtos",
        name: "produtos",
        component: () => import("src/pages/produtos/produtosPage.vue"),
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
        path: "/lista-de-vendas",
        name: "listarVendas",
        component: () => import("pages/vendas/listarVendas.vue"),
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
      {
        path: "/form-funcionarios",
        name: "addFuncionarios",
        component: () => import("pages/funcionarios/addFuncionarios.vue"),
      },
      {
        path: "/list-funcionarios",
        name: "listFuncionarios",
        component: () =>
          import("src/pages/funcionarios/listarFuncionarios.vue"),
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
      {
        path: "/criete-count",
        name: "crietCount",
        component: () => import("src/pages/home/crieteCount.vue"),
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
