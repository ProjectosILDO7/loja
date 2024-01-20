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
            <q-input
              dense
              outlined
              type="number"
              v-model="form.nif"
              label="Nº do NIF"
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
    const totalConfig = ref(0);
    const idConfig = ref("");

    const form = ref({
      name: "",
      phone: "",
      nif: "",
      primary: "",
      secondary: "",
    });

    onMounted(() => {
      carregarConfig();
    });

    const carregarConfig = async () => {
      try {
        $q.loading.show();
        const config = await db.collection(tabela).get({ keys: true });
        form.value.name = config[0].data.name;
        form.value.phone = config[0].data.phone;
        form.value.nif = config[0].data.nif;
        form.value.primary = config[0].data.primary;
        form.value.secondary = config[0].data.secondary;
        idConfig.value = config[0].key;
        totalConfig.value = config.length;
      } catch (error) {
      } finally {
        $q.loading.hide();
      }
    };

    const saveConfig = async () => {
      console.log(totalConfig.value);
      try {
        if (totalConfig.value != 0) {
          $q.loading.show();
          const { name, phone, nif, primary, secondary } = form.value;
          await db.collection(tabela).doc(idConfig.value).update({
            name: name,
            phone: phone,
            nif: nif,
            primary: primary,
            secondary: secondary,
          });
          setBrand(form.value.primary, form.value.secondary);
          carregarConfig();
          location.reload();
        } else {
          $q.loading.show();
          const { name, phone, nif, primary, secondary } = form.value;
          console.log(name);
          await db.collection(tabela).add({
            name: name,
            phone: phone,
            nif: nif,
            primary: primary,
            secondary: secondary,
          });
          setBrand(form.value.primary, form.value.secondary);
          carregarConfig();
          location.reload();
        }
      } catch (error) {
        console.log(error);
      } finally {
        $q.loading.hide();
        router.push({ name: "admin" });
      }
    };
    return { form, saveConfig, carregarConfig, totalConfig, idConfig };
  },
});
</script>
