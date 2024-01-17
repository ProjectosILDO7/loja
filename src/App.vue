<template>
  <router-view />
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { LocalStorage } from "quasar";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "App",
  setup() {
    const router = useRouter();

    onMounted(() => {
      try {
        if (localStorage.getItem("loja") == null) {
          router.push({ name: "" });
        } else {
          router.push({ name: "admin" });
        }
      } catch (error) {
        console.log(error.message);
      }
    });
    return { router };
  },
});
</script>
