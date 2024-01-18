<template>
  <q-layout>
    <q-page-container>
      <q-page padding>
        <q-form class="row justify-center" @submit.prevent="userLogin">
          <p class="col-12 text-h5 text-center q-mt-lg">
            <img src="../../../public/favicon.ico" style="max-width: 300px" />
          </p>

          <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-sm">
            <q-input
              dense
              outlined
              v-model="form.email"
              label="E-mail"
              class="col-12"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Porfavor digite seu e-mail',
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-at" />
              </template>
            </q-input>

            <q-input
              outlined
              dense
              v-model="form.password"
              label="Senha"
              type="password"
              class="col-12"
              :rules="[
                (val) =>
                  (val !== null && val !== '') || 'Porfavor digite sua senha',
                (val) =>
                  (val > 0 && val >= 6) ||
                  'A sua senha deve ter maior ou igual a 6 caracteres',
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-lock" />
              </template>
            </q-input>

            <q-btn
              type="submit"
              label="Entrar"
              class="full-width q-mt-lg"
              glossy
              color="primary"
              icon="mdi-login"
              no-caps
            />
            <q-btn
              flat
              label="Criar conta na loja"
              class="full-width q-mt-lg"
              color="secondary"
              icon="mdi-account-tie"
              no-caps
              @click="crieteCount"
              v-if="isAdmin"
            />
          </div>
        </q-form>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import useNotification from "src/utils/notify";
import { ref, onMounted } from "vue";
import { Loading, useQuasar, LocalStorage } from "quasar";
import { useRouter } from "vue-router";
import { db } from "src/boot/localbase";
export default {
  name: "form-login",
  setup() {
    const { notifyError, notifySuccess } = useNotification();
    const $q = useQuasar();
    const router = useRouter();
    const isAdmin = ref(false);
    const form = ref({
      email: "",
      password: "",
      router,
    });

    const crieteCount = () => {
      router.push({ name: "crietCount" });
    };

    onMounted(async () => {
      try {
        const result = await db
          .collection("users")
          .get()
          .then((item) => item.filter((user) => user.acesso == "admin"));
        console.log(result);
        if (result.length > 0) {
          isAdmin.value = false;
        } else {
          isAdmin.value = true;
        }
      } catch (error) {
        console.log(error.message);
      }
    });

    const userLogin = async () => {
      try {
        $q.loading.show();
        const getEmail = await db
          .collection("users")
          .get()
          .then((item) =>
            item.filter((user) => user.email == form.value.email)
          );
        if (getEmail.length > 0 && getEmail[0].status == 1) {
          const pass = await db
            .collection("users")
            .get()
            .then((iten) =>
              iten.filter(
                (password) => password.password == form.value.password
              )
            );
          if (pass.length > 0) {
            LocalStorage.set("loja", getEmail[0].name);
            LocalStorage.set("acesso", getEmail[0].acesso);
            router.push({ name: "admin" });
            notifySuccess("Acesso permitido");
          } else {
            notifyError("A senha que digitou está errada...!");
          }
        } else {
          notifyError(
            "Acesso negado, ou precisas de permissão do Administrador...!"
          );
          return;
        }
      } catch (error) {
        notifyError(error.message);
      } finally {
        Loading.hide();
      }
    };
    return {
      form,
      userLogin,
      crieteCount,
      isAdmin,
    };
  },
};
</script>
<style scoped></style>
