import { boot } from "quasar/wrappers";
import Localbase from "localbase";

const db = new Localbase("loja");
export default boot(({ app }) => {
  app.config.globalProperties.$db = db;
});

export { db };
