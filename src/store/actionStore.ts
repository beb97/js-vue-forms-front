import { getAll } from "@/api/actionApi";
import Action, { ActionDTO } from "@/model/Action";
import { useGeneralStore } from "@/store/generaStorel";
import { defineStore } from "pinia";
import { Ref, ref } from "vue";

// PARAM 1 : nom du store
// PARAM 2 : objet representant le store
export const useActionStore = defineStore("actions", () => {
  const generalStore = useGeneralStore();
  const { shouldFetch, setDirtyContext } = generalStore;

  const actions: Ref<Action[]> = ref([]);
  const lastRefresh: Ref<number> = ref(0);

  function getActions() {
    return actions;
  }

  function getActionsByRole() {
    return (role: String) => actions.value.filter((action) => action?.nom == role);
  }

  function initActions() {
    if (shouldFetch(lastRefresh.value)) {
      fetchActions();
    }
  }

  function refreshActions() {
    setDirtyContext();
    fetchActions();
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
