<template>
  <q-layout>
    <q-page-container>
      <q-page class="text-body1" padding>
        <p>Configurações</p>
        <q-separator />
        <div class="row justify-center q-gutter-sm q-mt-lg">
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-gutter-sm">
            <q-input
              dense
              outlined
              type="text"
              v-model="form.name"
              label="Nome da Instituição"
            >
            </q-input>
            <q-input
              dense
              outlined
              type="text"
              v-model="form.phone"
              label="Nº do telemóvel"
              mask="(###) ### ###"
              unmasked-value
            >
            </q-input>
            <div class="row justify-center q-gutter-x-lg q-pa-md">
              <q-color
                v-model="form.primary"
                class="col-md-4 col-lg-4 col-xs-12 col-sm-12"
              />
              <q-color
                v-model="form.secondary"
                class="col-md-4 col-lg-4 col-xs-12 col-sm-12"
              />
            </div>

            <q-btn
              class="full-width"
              icon="mdi-content-save-cog"
              color="green-10"
              label="Salvar configurações"
              @click="saveConfig"
            />
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import useBrand from "src/composible/useBrand";
import { useQuasar } from "quasar";
import { db } from "src/boot/localbase";
export default defineComponent({
  name: "config-page",
  setup() {
    const tabela = "config";
    const { setBrand } = useBrand();
    const $q = useQuasar();
    const router = useRouter();

    const form = ref({
      name: "",
      phone: "",
      primary: "",
      secondary: "",
    });

    onMounted(() => {
      carregarConfig();
    });

    const carregarConfig = async () => {
      try {
        $q.loading.show();
        const config = await db.collection(tabela).get();
        form.value = config[0];
      } catch (error) {
        console.log(error.message);
      } finally {
        $q.loading.hide();
      }
    };

    const saveConfig = async () => {
      try {
        if (form.value.id) {
          $q.loading.show();
          const { name, phone, primary, secondary } = form.value;
          await db.collection(tabela).add({
            name: name,
            phone: phone,
            primary: primary,
            secondary: secondary,
          });
          setBrand(form.value.primary, form.value.secondary);
          carregarConfig();
        } else {
          $q.loading.show();
          const { name, phone, primary, secondary } = form.value;
          console.log(name);
          await db.collection(tabela).add({
            name: name,
            phone: phone,
            primary: primary,
            secondary: secondary,
          });
          setBrand(form.value.primary, form.value.secondary);
          carregarConfig();
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        $q.loading.hide();
        router.push({ name: "admin" });
      }
    };
    return { form, saveConfig, carregarConfig };
  },
});
</script>
