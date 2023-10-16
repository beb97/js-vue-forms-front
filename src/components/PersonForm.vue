<template>
    <p>Ajouter :</p>
    <form  @submit.prevent="onSubmit">
        <input type="text" name="nom" placeholder="nom" v-model="formNom"/>
        <input type="submit" value="Ajouter"/>
    </form>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import {usePersonStore} from '../store/person'

const personStore = usePersonStore();
const formNom = ref("");

async function onSubmit() {

    axios.post("/person/", {
        "nom": formNom.value
    })
    .then(res => {
        console.log(res);
        if(res.status == 201) {
            formNom.value = "";
            personStore.fetchPersons();
        }
    })
    .catch(err => {
        console.log(err);
    })

}

</script>

<style scoped>
</style>