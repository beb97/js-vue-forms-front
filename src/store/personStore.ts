import { getAll } from "@/api/personApi";
import Person from "@/model/Person";
import { useGeneralStore } from "@/store/generaStorel";
import { defineStore } from "pinia";
import { Ref, ref } from "vue";

// PARAM 1 : nom du store
// PARAM 2 : objet representant le store
export const usePersonStore = defineStore("persons", () => {
  const generalStore = useGeneralStore();
  const { setDirtyContext, shouldFetch } = generalStore;

  const persons: Ref<Person[]> = ref([]);
  const lastRefresh: Ref<number> = ref(0);

  function getPersons() {
    return persons;
  }
  function getPersonsByRole(role: String) {
    return persons.value.filter((person) => person.nom == role);
  }

  function getPersonsByStructure(id: number) {
    return persons.value.filter((person) => person.structure?.id == id);
  }

  async function fetchPersons() {
    getAll()
      .then((res) => {
        console.log("fetchAll persons", res.data);
        persons.value = res.data;
        lastRefresh.value = Date.now();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function initPersons() {
    if (shouldFetch(lastRefresh.value)) {
      fetchPersons();
    }
  }

  function refreshPersons() {
    setDirtyContext();
    fetchPersons();
  }

  return {
    persons,
    lastRefresh,
    getPersons,
    getPersonsByRole,
    getPersonsByStructure,
    initPersons,
    refreshPersons,
    fetchPersons,
  };
});
