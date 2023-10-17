import { getAll } from "@/api/action.api";
import { useGeneralStore } from "@/store/general";
import { defineStore } from "pinia";
import { ref } from "vue";

// PARAM 1 : nom du store
// PARAM 2 : objet representant le store
export const useActionStore = defineStore("actions", () => {
  const generalStore = useGeneralStore();
  const { shouldFetch, setDirtyContext } = generalStore;

  const actions = ref([]);
  const lastRefresh = ref(null);

  function getActions() {
    return actions;
  }

  function getActionsByRole() {
    // TODO : doesnt work for now
    // https://github.com/vuejs/pinia/discussions/1194
    return () => actions.value.filter((action) => action.nom == "pierre");
  }

  function initActions() {
    if (shouldFetch(lastRefresh.value)) {
      this.fetchActions();
    }
  }

  function refreshActions() {
    setDirtyContext();
    this.fetchActions();
  }

  async function fetchActions() {
    getAll()
      .then((res) => {
        console.log("fetchAll actions", res.data);
        actions.value = res.data;
        lastRefresh.value = Date.now();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return {
    actions,
    lastRefresh,
    getActions,
    getActionsByRole,
    initActions,
    refreshActions,
    fetchActions,
  };
});
