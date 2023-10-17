<template>

    <tr>
        <td>{{props.action.structure.nom}}</td>
        <td v-if="!isEditMode">{{props.action.nom}}</td>
        <td v-if="isEditMode">
            <form  @submit.prevent="handleUpdate">
                <input type="text" name="nom" v-model="inputNom"/>
                <input type="submit" value="Modifier" />
            </form>
        </td>
        <td>{{props.action.formateur.nom}}</td>
        <td>{{props.action.commercial.nom}}</td>
        <td @click="toogleEditMode"><a>🖊️</a></td>
        <td @click="handleDelete"><a>🗑️</a></td>
    </tr>

</template>

<script setup>

import { defineProps, ref, onMounted } from 'vue';
import axios from 'axios';
import {useActionStore} from '../../store/action'

const actionStore = useActionStore();

const props = defineProps(['action'])
const inputNom = ref('')
const isEditMode = ref(false);

function toogleEditMode() {
    isEditMode.value = !isEditMode.value;
}

// TODO : try catch
async function handleDelete() {
    axios.delete(`/action/${props.action.id}`)
    .then( res => {
        console.log(res);
        if(res.status == 200) {
            actionStore.fetchActions();
        }
    })
    .catch(err => console.log(err));    

}

// TODO : try catch
async function handleUpdate() {
    axios.put(`/action/${props.action.id}`, {
        nom: inputNom.value,
        formateurId: props.action.formateur.id,
        commercialId: props.action.commercial.id
    })    
    .then( res => {
    console.log(res);
    if(res.status == 201) {
        actionStore.fetchActions();
        toogleEditMode();
    }
    })
    .catch(err => console.log(err));

}

onMounted(() => {
    inputNom.value = props.action.nom;
})


</script>

<style scoped>
td {
  padding: 10px;
}
</style>