import { defineStore } from "pinia";
import axios from "axios";

// PARAM 1 : nom du store
// PARAM 2 : objet representant le store
export const useStructureStore = defineStore('structures', {
    state() {
        return {
            structures: []
        }
    },
    getters: {
        getStructures :(state) => state.structures,
        structuresByRole: (state) => {
            // TODO : doesnt work for now 
            // https://github.com/vuejs/pinia/discussions/1194
            return () => state.structures.filter(structure => structure.nom=="pierre")
        }
    },
    actions: {
        async fetchStructures() {
            axios.get('/structure/')
            .then(res => {
                console.log(res.data);
                this.structures = res.data;
            })
            .catch(err => {
                console.log(err);
            })
        },
        // async postStructures() {
        //     axios.post("/structure/", {
        //         "nom": formNom.value
        //     });
        // }
    }
});