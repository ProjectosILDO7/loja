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
              v-model="form.name"
              label="Nome"
              class="col-12"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Porfavor digite seu nome',
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-account" />
              </template>
            </q-input>

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
                  val.length >= 6 ||
                  'A sua senha deve ter maior ou igual a 6 caracteres',
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-lock" />
              </template>
            </q-input>

            <q-btn
              type="submit"
              label="Criar conta"
              class="full-width q-mt-lg"
              glossy
              color="primary"
              icon="mdi-account-tie"
              no-caps
            />

            <q-btn
              flat
              label="Ir para o login"
              class="full-width q-mt-lg"
              color="secondary"
              icon="mdi-login"
              no-caps
              @click="goToLogin"
            />
          </div>
        </q-form>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import useNotification from "src/utils/notify";
import { ref } from "vue";
import { Loading, useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { db } from "src/boot/localbase";
export default {
  name: "form-login",
  setup() {
    const { notifyError, notifySuccess } = useNotification();
    const $q = useQuasar();
    const router = useRouter();
    const form = ref({
      name: "",
      email: "",
      password: "",
    });

    const goToLogin = () => {
      router.push({ name: "login" });
    };

    const userLogin = async () => {
      try {
        $q.loading.show();
        const user = await db
          .collection("users")
          .get()
          .then((user) =>
            user.filter((email) => email.email == form.value.email)
          );
        if (user.length > 0) {
          notifyError("Já existe um suário com estas credenciais...!");
          return;
        } else {
          const { name, email, password } = form.value;
          await db.collection("users").add({
            name: name,
            email: email,
            password: password,
            acesso: "admin",
            status: 1,
          });
          notifySuccess("Conta criada com sucesso");
          router.push({ name: "login" });
        }
      } catch (error) {
        console.log(error.message);
        notifyError(error.message);
      } finally {
        Loading.hide();
      }
    };
    return {
      form,
      userLogin,
      goToLogin,
    };
  },
};
</script>
<style scoped></style>
