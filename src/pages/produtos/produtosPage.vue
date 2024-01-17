<template>
  <q-layout>
    <q-page-container>
      <q-page padding>
        <div class="row">
          <div class="col-6">
            <p class="text-body1">Informações de produtos & <b>Stock</b></p>
          </div>
          <q-space />
          <q-btn
            flat
            dense
            icon="mdi-basket-plus"
            color="green-10"
            no-caps
            @click="showForm"
          />
          <q-btn
            dense
            flat
            icon="mdi-format-list-bulleted"
            @click="formularioCad = false"
          />
        </div>

        <q-separator />

        <div class="row justify-center">
          <q-form @submit.prevent="addProdutos" v-if="formularioCad">
            <div class="col-4">
              <input
                dense
                outlined
                type="file"
                @change="handleFileUpload"
                class="q-mt-sm"
                accept="image/*"
              />

              <q-avatar square size="100px" font-size="82px" text-color="white">
                <q-img
                  v-if="form.imageUrl"
                  :src="form.imageUrl"
                  :alt="form.produto"
                  style="max-width: 100%"
                />
              </q-avatar>
            </div>
            <div class="col-4">
              <q-select
                dense
                outlined
                v-model="form.categoria"
                :options="categorias"
                label="Selecione uma categoria"
                option-value="id"
                option-label="categoria"
                map-options
                emit-value
                class="q-mt-sm"
                lazy-rules
                :rules="[
                  (val) => !!val || 'Porfavor informe o nome da categoria',
                ]"
              >
                <template v-slot:prepend>
                  <q-icon name="mdi-shape-plus" />
                </template>
              </q-select>
            </div>
            <div class="col-4">
              <q-input
                outlined
                dense
                type="text"
                label="Novo produto"
                class="q-mt-sm"
                v-model="form.produto"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Porfavor informe o nome da categoria',
                ]"
              >
                <template v-slot:prepend>
                  <q-icon name="mdi-basket-plus" /> </template
              ></q-input>
            </div>

            <div class="col-4">
              <q-input
                outlined
                dense
                type="number"
                label="Quantidade em stock"
                class="q-mt-sm"
                v-model="form.quantidade"
                lazy-rules
                :rules="[
                  (val) => !!val || 'Porfavor informe a do produto em stock',
                ]"
              >
                <template v-slot:prepend>
                  <q-icon name="mdi-numeric" /> </template
              ></q-input>
            </div>

            <div class="col-4">
              <q-input
                outlined
                dense
                type="text"
                label="Preço de venda"
                class="q-mt-sm"
                v-model="form.preco"
                lazy-rules
                :rules="[
                  (val) => !!val || 'Porfavor informe o preço do produto',
                ]"
                @input="formatarMoeda"
                :before="formatCurrency(form.preco)"
              >
                <template v-slot:prepend>
                  <q-icon name="mdi-chess-bishop" /> </template
              ></q-input>
            </div>
            <div class="col-4">
              <q-btn
                type="submit"
                dense
                color="green-10"
                class="full-width q-mt-sm"
                label="Cadastrar produto"
                icon="mdi-content-save-outline"
              />
            </div>
          </q-form>
        </div>
        <q-table
          dense
          :rows="rows"
          :columns="columns"
          row-key="name"
          class="q-mt-md"
          :loading="loading"
          :filter="filter"
          v-if="formularioCad == false"
        >
          <template v-slot:top>
            <q-input dense outlined class="" label="Procurar" v-model="filter">
              <template v-slot:append>
                <q-icon name="mdi-magnify" />
              </template>
            </q-input>
          </template>

          <template v-slot:body-cell-img_url="props">
            <q-td :props="props">
              <q-avatar square size="80px" font-size="82px" text-color="white">
                <q-img :src="props.row.imageUrl.imageUrl"></q-img>
              </q-avatar>
            </q-td>
          </template>

          <template v-slot:body-cell-options="props">
            <q-td :props="props" class="q-gutter-sm">
              <q-btn
                size="sm"
                flat
                outline
                dense
                icon="mdi-file-edit"
                color="green-10"
                @click="editForm(props.row.key)"
              ></q-btn>
              <q-btn
                size="sm"
                flat
                outline
                dense
                icon="mdi-delete-outline"
                color="red-10"
                @click="deleteItem(props.row.key)"
              ></q-btn>
            </q-td>
          </template>
        </q-table>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { onMounted, ref } from "vue";
import { columns } from "./table";
import { Loading, Notify, Dialog } from "quasar";
import { db } from "src/boot/localbase";
import { formatCurrency } from "src/utils/formatNumber";

export default {
  components: {},
  setup() {
    const tabela = "produtos";
    const filter = ref("");
    const loading = ref(true);
    const isUpdate = ref("");
    const rows = ref([]);
    const formularioCad = ref(false);
    const categorias = ref([]);

    const form = ref({
      categoria: "",
      produto: "",
      quantidade: 0,
      preco: 0,
      data: new Date().toJSON().slice(0, 10),
      imageUrl: "",
    });

    const formatarMoeda = () => {
      // Lógica para formatar a moeda conforme necessário
      // Por exemplo, remova caracteres não numéricos e formate a moeda
      form.value.preco = form.value.preco.replace(/[^\d.]/g, "");
      // Outras lógicas de formatação podem ser adicionadas aqui
    };

    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
          form.value.imageUrl = e.target.result;
        };

        reader.readAsDataURL(file);
      }
    };

    const cleanForm = () => {
      form.value = {
        categoria: "",
        produto: "",
        quantidade: 0,
        preco: 0,
        data: new Date().toJSON().slice(0, 10),
        imageUrl: "",
      };
    };

    const editForm = async (id) => {
      try {
        const response = await db.collection(tabela).doc(id).get();
        form.value.categoria = response.categoria;
        form.value.produto = response.produto;
        form.value.preco = response.preco;
        form.value.preco = response.preco;
        form.value.img_url = response.img_url;
        form.value.quantidade = response.quantidade;
        isUpdate.value = id;
        formularioCad.value = true;
      } catch (error) {
        console.log(error.message);
      }
    };
    const showForm = () => {
      formularioCad.value = true;
      isUpdate.value = "";
      cleanForm();
    };
    const deleteItem = (id) => {
      Dialog.create({
        title: "Confirme",
        message: "Tens a certeza que pretendes apagar esse produto?",
        cancel: true,
        persistent: true,
      })
        .onOk(async () => {
          await db.collection(tabela).doc(id).delete();
          carregarInfo();
        })
        .onOk(() => {
          // console.log('>>>> second OK catcher')
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    };

    const addProdutos = async () => {
      try {
        const findRegistro = rows.value.find(
          (produto) => produto.produto === form.value.produto
        );
        if (findRegistro) {
          Notify.create({
            message: "O produto que pretendes registrar já existe",
            position: "top",
            icon: "mdi-check-circle",
            color: "red-10",
          });
          return;
        } else {
          if (isUpdate.value) {
            Loading.show();
            if (form.value.imageUrl) {
              const imageObject = {
                produto: form.value.produto,
                imageUrl: form.value.imageUrl,
              };
              console.log(imageObject);
              const { produto, categoria, preco, quantidade, data, img_url } =
                form.value;
              await db.collection(tabela).doc(isUpdate.value).update({
                produto: produto,
                categoria: categoria.categoria,
                preco: preco,
                quantidade: quantidade,
                data: data,
                imageUrl: imageObject,
              });
              db.objectStorage;
              Notify.create({
                message: "O produto foi actualizado com sucesso",
                position: "top",
                icon: "mdi-check-circle",
                color: "green-10",
              });
            }
            formularioCad.value = false;
            cleanForm();
            formularioCad.value = false;
          } else {
            if (form.value.imageUrl) {
              const imageObject = {
                produto: form.value.produto,
                imageUrl: form.value.imageUrl,
              };
              console.log(imageObject);
              Loading.show();
              const { produto, categoria, preco, quantidade, data, img_url } =
                form.value;
              await db.collection(tabela).add({
                produto: produto,
                categoria: categoria.categoria,
                preco: preco,
                quantidade: quantidade,
                data: data,
                imageUrl: imageObject,
              });
              Notify.create({
                message: "Produto salvo com sucesso",
                position: "top",
                icon: "mdi-check-circle",
                color: "green-10",
              });
              formularioCad.value = false;
              cleanForm();
            }
          }
        }
      } catch (error) {
        Notify.create({
          message: error.message,
          position: "top",
          icon: "mdi-close-circle-outline",
          color: "red-10",
        });
      } finally {
        Loading.hide();
        carregarInfo();
      }
    };

    onMounted(() => {
      carregarInfo();
      carregarInfoCateg();
    });

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
        Notify.create({
          message: error.message,
          position: "top",
          icon: "mdi-close-circle-outline",
          color: "red-10",
        });
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
        Notify.create({
          message: error.message,
          position: "top",
          icon: "mdi-close-circle-outline",
          color: "red-10",
        });
      } finally {
        loading.value = false;
      }
    };
    return {
      columns,
      rows,
      loading: false,
      addProdutos,
      filter,
      deleteItem,
      form,
      showForm,
      formularioCad,
      cleanForm,
      editForm,
      carregarInfoCateg,
      categorias,
      handleFileUpload,
      formatarMoeda,
      formatCurrency,
    };
  },
};
</script>
