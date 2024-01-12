<template>
  <q-layout>
    <q-page-container>
      <q-page padding>
        <p class="text-body1">Informações de categorias</p>
        <q-separator />

        <q-form @submit.prevent="addCategoria" v-if="formularioCad">
          <q-input
            outlined
            dense
            type="text"
            label="Nova categoria"
            class="q-mt-sm"
            v-model="form.categoria"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                'Porfavor informe o nome da categoria',
            ]"
          >
            <template v-slot:prepend>
              <q-icon name="mdi-shape-plus" /> </template
          ></q-input>
          <q-btn
            type="submit"
            dense
            color="green-10"
            class="full-width q-mt-sm"
            label="Cadastrar categoria"
            icon="mdi-content-save-outline"
          />
        </q-form>
        <q-table
          dense
          :rows="rows"
          :columns="columns"
          row-key="name"
          class="q-mt-md"
          :loading="loading"
          :filter="filter"
        >
          <template v-slot:top>
            <q-input dense outlined class="" label="Procurar" v-model="filter">
              <template v-slot:append>
                <q-icon name="mdi-magnify" />
              </template>
            </q-input>
            <q-space />
            <q-btn
              dense
              icon="mdi-shape-plus"
              label="Nova categoria"
              color="green-10"
              no-caps
              @click="showForm"
            />
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

export default {
  components: {},
  setup() {
    const tabela = "categorias";
    const filter = ref("");
    const loading = ref(true);
    const isUpdate = ref("");
    const rows = ref([]);
    const formularioCad = ref(false);

    const form = ref({
      categoria: "",
      data: new Date().toJSON().slice(0, 10),
    });

    const cleanForm = () => {
      form.value = {
        categoria: "",
        data: new Date().toJSON().slice(0, 10),
      };
    };

    const editForm = async (id) => {
      try {
        const response = await db.collection(tabela).doc(id).get();
        form.value.categoria = response.categoria;
        isUpdate.value = id;
        formularioCad.value = true;
      } catch (error) {
        console.log(error.message);
      }
    };
    const showForm = () => {
      formularioCad.value = true;
      isUpdate.value = "";
    };
    const deleteItem = (id) => {
      Dialog.create({
        title: "Confirme",
        message: "Tens a certeza que pretendes apagar essa categoria?",
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

    const addCategoria = async () => {
      try {
        const findRegistro = rows.value.find(
          (categoria) => categoria.categoria === form.value.categoria
        );
        if (findRegistro) {
          Notify.create({
            message: "A categoria que pretendes registrar já existe",
            position: "top",
            icon: "mdi-check-circle",
            color: "red-10",
          });
          return;
        } else {
          if (isUpdate.value) {
            Loading.show();
            const { categoria, data } = form.value;
            await db.collection(tabela).doc(isUpdate.value).update({
              categoria: categoria,
              data: data,
            });
            Notify.create({
              message: "Categoria Actualizada com sucesso",
              position: "top",
              icon: "mdi-check-circle",
              color: "green-10",
            });
            formularioCad.value = false;
            cleanForm();
          } else {
            Loading.show();
            const { categoria, data } = form.value;
            await db.collection(tabela).add({
              categoria: categoria,
              data: data,
            });
            Notify.create({
              message: "Categoria salva com sucesso",
              position: "top",
              icon: "mdi-check-circle",
              color: "green-10",
            });
            formularioCad.value = false;
            cleanForm();
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
    return {
      columns,
      rows,
      loading: false,
      addCategoria,
      filter,
      deleteItem,
      form,
      showForm,
      formularioCad,
      cleanForm,
      editForm,
    };
  },
};
</script>
