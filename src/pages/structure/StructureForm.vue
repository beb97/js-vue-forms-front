<template>
    <h2>Ajouter</h2>
    <form  @submit.prevent="onSubmit">
        <input type="text" name="nom" placeholder="nom" v-model="formNom"/>
        <input type="submit" value="Ajouter"/>
    </form>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import {useStructureStore} from '../../store/structure'

const structureStore = useStructureStore();
const formNom = ref("");

async function onSubmit() {

    axios.post("/structure/", {
        "nom": formNom.value
    })
    .then(res => {
        console.log(res);
        if(res.status == 201) {
            formNom.value = "";
            structureStore.fetchStructures();
        }
    })
    .catch(err => {
        console.log(err);
    })

}

</script>

<style scoped>
</style>