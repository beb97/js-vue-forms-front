<template>

    <tr>
        <td v-if="!isEditMode">{{props.person.nom}}</td>
        <td v-if="isEditMode">
            <form  @submit.prevent="handleUpdate">
            <input type="text" name="nom" v-model="inputNom"/>
            <input type="submit" value="Modifier" />
            </form>
        </td>
        <td @click="toogleEditMode"><a>🖊️</a></td>
        <td @click="handleDelete"><a>🗑️</a></td>
    </tr>

</template>

<script setup>

import { defineProps, ref, onMounted } from 'vue';
import axios from 'axios';
import {usePersonStore} from '../store/person'

const personStore = usePersonStore();

const props = defineProps(['person'])
const inputNom = ref('')
const isEditMode = ref(false);

function toogleEditMode() {
    isEditMode.value = !isEditMode.value;
}

// TODO : try catch
async function handleDelete() {
    const res = await axios.delete(`/person/${props.person.id}`);    
    console.log(res);
    if(res.status == 200) {
        personStore.fetchPersons();
    }
}

// TODO : try catch
async function handleUpdate() {
    const res = await axios.put(`/person/${props.person.id}`, {
        nom: inputNom.value
    });    
    console.log(res);
    if(res.status == 201) {
        personStore.fetchPersons();
        toogleEditMode();
    }
}

onMounted(() => {
    inputNom.value = props.person.nom;
})


</script>

<style scoped>
td {
  padding: 10px;
}
</style>