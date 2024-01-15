<template>
  <q-toggle
    v-model="darkmode"
    checked-icon="mdi-moon-waxing-crescent"
    color="black"
    unchecked-icon="mdi-white-balance-sunning"
  />
</template>
<script>
import { useQuasar } from "quasar";
import { ref, watch, onMounted } from "vue";

export default {
  setup() {
    const darkmode = ref(false);
    const $q = useQuasar();

    watch(darkmode, (darkmode) => {
      $q.dark.set(darkmode);
      $q.localStorage.set("darkMode", darkmode);
    });

    onMounted(() => {
      const darkModeIsActive = $q.localStorage.getItem("darkMode");
      if (darkModeIsActive) {
        darkmode.value = true;
      }
    });

    return {
      darkmode,
    };
  },
};
</script>
