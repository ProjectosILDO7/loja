import { db } from "boot/localbase";
import { ref } from "vue";
import useBrand from "src/composible/useBrand.js";
import { useQuasar } from "quasar";

const brand = ref({
  name: "",
  phone: "",
  primary: "",
  secondary: "",
});
export default function userApi() {
  // const { user } = userAuthUser();
  const $q = useQuasar();
  //const fileName = uuid();
  // const { supabase } = userSupabase();
  const { setBrand } = useBrand();

  const getBrand = async () => {
    //  const id = user?.value?.id;
    $q.loading.show();
    const response = await db.collection("config").get();

    if (response.length > 0) {
      (brand.value = response[0]),
        setBrand(brand.value.primary, brand.value.secondary);
    }
    $q.loading.hide();
    return brand;
  };

  return {
    getBrand,
    brand,
  };
}
