import { defineStore } from "pinia";
import axios from "axios";

// PARAM 1 : nom du store
// PARAM 2 : objet representant le store
export const usePersonStore = defineStore("persons", {
  state() {
    return {
      persons: [],
    };
  },
  getters: {
    getPersons: (state) => state.persons,
    personsByRole: (state) => {
      // TODO : doesnt work for now
      // https://github.com/vuejs/pinia/discussions/1194
      return () => state.persons.filter((person) => person.nom == "pierre");
    },
  },
  actions: {
    async fetchPersons() {
      axios
        .get("/person/")
        .then((res) => {
          console.log(res.data);
          this.persons = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // async postPersons() {
    //     axios.post("/person/", {
    //         "nom": formNom.value
    //     });
    // }
  },
});
