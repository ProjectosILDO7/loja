import { useQuasar } from "quasar";

export default function notification() {
  const $q = useQuasar();

  const notifySuccess = (message) => {
    $q.notify({
      timeout: 5000,
      message: message,
      position: "bottom",
      color: "secondary",
      icon: "mdi-check",
    });
  };
  const notifyError = (message) => {
    $q.notify({
      timeout: 5000,
      message: message,
      position: "bottom",
      color: "red-10",
      icon: "mdi-alert-circle-outline",
    });
  };

  const notifyinfo = (message) => {
    $q.notify({
      timeout: 5000,
      message: message,
      position: "bottom",
      color: "deep-orange",
      icon: "mdi-alert",
    });
  };

  return {
    notifySuccess,
    notifyError,
    notifyinfo,
  };
}
export { notification };
