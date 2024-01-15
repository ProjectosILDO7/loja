<template>
  <q-layout>
    <q-page-container>
      <q-page padding>
        <div class="row">
          <span class="text-body1"><b>Lista de todos os funcionários</b></span>
        </div>
        <q-separator />
        <q-table dense flat :rows="users" :columns="columns" row-key="name">
          <template v-slot:body-cell-status="props">
            <q-td :props="props">
              <span v-if="props.row.status == 1" class="text-green-10">
                <b>Activo</b>
              </span>
              <span v-else class="text-red-10">
                <b>Inativo</b>
              </span>
            </q-td>
          </template>
          <template v-slot:body-cell-options="props">
            <q-td :props="props">
              <q-btn
                flat
                dense
                size="sm"
                icon="mdi-delete"
                color="red-10"
                @click="deleteFuncionario(props.row.key)"
              ></q-btn>
              <q-btn
                flat
                dense
                size="sm"
                icon="mdi-lock"
                color="green-grey-5"
                v-if="props.row.status == 1"
                @click="inactivarFuncionario(props.row.key)"
                title="Bloquear"
              ></q-btn>
              <q-btn
                flat
                dense
                size="sm"
                icon="mdi-lock-off"
                color="blue-grey-5"
                v-else
                @click="activarFuncionario(props.row.key)"
                title="Desbloaquear"
              ></q-btn>
            </q-td>
          </template>
        </q-table>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
import { defineComponent, ref, onMounted } from "vue";
import { db } from "boot/localbase";
import { columns } from "./table";
import { useQuasar } from "quasar";

export default defineComponent({
  setup() {
    const users = ref([]);
    const $q = useQuasar();

    onMounted(() => {
      carregarUsers();
    });

    const carregarUsers = async () => {
      try {
        $q.loading.show();
        const response = await db.collection("users").get({ keys: true });
        users.value = response.map((item) => {
          return {
            ...item.data,
            key: item.key,
          };
        });
      } catch (error) {
        console.log(error.message);
      } finally {
        $q.loading.hide();
      }
    };

    const activarFuncionario = async (key) => {
      try {
        await db.collection("users").doc(key).update({
          status: 1,
        });
        carregarUsers();
      } catch (error) {
        console.log(erros.message);
      }
    };
    const inactivarFuncionario = async (key) => {
      try {
        await db.collection("users").doc(key).update({
          status: 0,
        });
        carregarUsers();
      } catch (error) {
        console.log(erros.message);
      }
    };

    const deleteFuncionario = (key) => {
      try {
        $q.dialog({
          title: "Confirme",
          message: "Tens a certeza que pretendes apagar este funcionario ?",
          cancel: true,
          persistent: true,
        })
          .onOk(async () => {
            await db.collection("users").doc(key).delete();
            carregarUsers();
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
      } catch (error) {
        console.log(error.message);
      } finally {
        carregarUsers();
      }
    };

    return {
      columns,
      users,
      carregarUsers,
      activarFuncionario,
      inactivarFuncionario,
      deleteFuncionario,
    };
  },
});
</script>
