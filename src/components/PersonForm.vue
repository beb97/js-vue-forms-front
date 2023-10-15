<template>
    <p>Personne ajout</p>
    <form  @submit.prevent="onSubmit">
        <input type="text" name="nom" v-model="formNom"/>
        <input type="submit" />
    </form>

</template>

<script setup>
import { ref , defineEmits} from 'vue'
import axios from 'axios'
const emit = defineEmits(['personCreated'])

const formNom = ref("");

async function onSubmit() {

    // TODO : try catch
    const res = await axios.post("/person/", {
        "nom": formNom.value
    });
    console.log(res);
    if(res.status == 201) {
        formNom.value = "";
        emit('personCreated');
    }
}

</script>

<style scoped>
</style>