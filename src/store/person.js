import { getAll } from "@/api/person.api";
import { useGeneralStore } from "@/store/general";
import { defineStore } from "pinia";
import { ref } from "vue";

// PARAM 1 : nom du store
// PARAM 2 : objet representant le store
export const usePersonStore = defineStore("persons", () => {
  const generalStore = useGeneralStore();
  const { setDirtyContext, shouldFetch } = generalStore;

  const persons = ref([]);
  const lastRefresh = ref(null);

  function getPersons() {
    return persons;
  }
  function getPersonsByRole(role) {
    return persons.value.filter((person) => person.nom == role);
  }

  async function fetchPersons() {
    getAll()
      .then((res) => {
        console.log("fetchAll persons", res.data);
        this.persons = res.data;
        this.lastRefresh = Date.now();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function initPersons() {
    if (shouldFetch(lastRefresh.value)) {
      this.fetchPersons();
    }
  }

  function refreshPersons() {
    setDirtyContext();
    this.fetchPersons();
  }

  return {
    persons,
    lastRefresh,
    getPersons,
    getPersonsByRole,
    initPersons,
    refreshPersons,
    fetchPersons,
  };
});
