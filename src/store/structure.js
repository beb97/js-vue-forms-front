import { defineStore } from "pinia";
import { getAll } from "@/api/structure.api";
import { ref } from "vue";
import { useGeneralStore } from "@/store/general";

// PARAM 1 : nom du store
// PARAM 2 : objet representant le store
export const useStructureStore = defineStore("structures", () => {
  const generalStore = useGeneralStore();
  const { shouldFetch, setDirtyContext } = generalStore;

  const structures = ref([]);
  const lastRefresh = ref(null);

  function getStructures() {
    return structures;
  }
  function structuresByRole() {
    return () =>
      structures.value.filter((structure) => structure.nom == "pierre");
  }

  async function fetchStructures() {
    getAll()
      .then((res) => {
        console.log("fetchAll structures", res.data);
        structures.value = res.data;
        lastRefresh.value = Date.now();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function refreshStructures() {
    setDirtyContext();
    this.fetchStructures();
  }

  function initStructures() {
    if (shouldFetch(lastRefresh.value)) {
      this.fetchStructures();
    }
  }

  return {
    structures,
    lastRefresh,
    getStructures,
    structuresByRole,
    initStructures,
    refreshStructures,
    fetchStructures,
  };
});
