import { defineStore } from "pinia";
import { getAll } from "@/api/structureApi";
import { Ref, ref } from "vue";
import { useGeneralStore } from "@/store/generaStorel";
import Structure from "@/model/Structure";

// PARAM 1 : nom du store
// PARAM 2 : objet representant le store
export const useStructureStore = defineStore("structures", () => {
  const generalStore = useGeneralStore();
  const { shouldFetch, setDirtyContext } = generalStore;

  const structures: Ref<Structure[]> = ref([]);
  const lastRefresh: Ref<number> = ref(0);

  function getStructures() {
    return structures;
  }

  function structuresByType() {
    return (type: String) => {
      console.log("filtering struct by type: ", type);
      return structures.value.filter((structure) => structure?.type == type);
    };
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
    fetchStructures();
  }

  function initStructures() {
    if (shouldFetch(lastRefresh.value)) {
      fetchStructures();
    }
  }

  return {
    structures,
    lastRefresh,
    getStructures,
    structuresByType,
    initStructures,
    refreshStructures,
    fetchStructures,
  };
});
