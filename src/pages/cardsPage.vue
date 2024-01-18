<template>
  <q-card class="my-card" flat bordered>
    <q-card-section horizontal>
      <div class="col flex flex-center text-body1 text-h6">
        {{ total }} - {{ label }}
      </div>
      <q-space />
      <q-card-actions vertical class="justify-around q-px-md">
        <q-btn flat round :color="color" :icon="icon" />
      </q-card-actions>
    </q-card-section>
  </q-card>
</template>
<script>
import { ref, onMounted } from "vue";
import { db } from "src/boot/localbase";
export default {
  props: {
    tabela: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: false,
      default: "mdi-database",
    },
    color: {
      type: String,
      required: false,
      default: "primary",
    },
  },

  setup(props) {
    const total = ref(0);

    onMounted(() => {
      carregarTota();
    });
    const carregarTota = async () => {
      try {
        const result = await db.collection(props.tabela).get();
        total.value = result.length;
      } catch (error) {}
    };

    return { total };
  },
};
</script>
