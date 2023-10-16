<template>
    <p>Ajouter :</p>
    <form  @submit.prevent="onSubmit">
        <fieldset>
            <legend>Formation</legend>
            <input type="text" name="nom" placeholder="nom" v-model="formNom" required/>
        </fieldset>
        <fieldset>
            <legend>Formateur</legend>
            
            <PersonSelect :persons="persons" @selectedPerson="handeFormateur"/>
        </fieldset>
        <fieldset>
            <legend>Commercial</legend>
            
            <PersonSelect :persons="persons" @selectedPerson="handeCommercial"/>
        </fieldset>

        <input type="submit" value="Ajouter"/>
    </form>
</template>

<script setup>
import { ref, computed, onMounted} from 'vue'
import axios from 'axios'
import {useActionStore} from '../store/action'
import {usePersonStore} from '../store/person'
import PersonSelect from './PersonSelect.vue';

const actionStore = useActionStore();
const personStore = usePersonStore();
const formNom = ref("");
const formFormateur = ref(0);
const formCommercial = ref(0);

const persons = computed(() => {
  return personStore.persons;
});


async function onSubmit(e) {

    if (!e.target.checkValidity()) {
        console.log("formulaire invalide");
        e.target.reportValidity();
        return false;
    }

    axios.post("/action/", {
        "nom": formNom.value,
        "formateurId":formFormateur.value,
        "commercialId":formCommercial.value
    })
    .then(res => {
        console.log(res);
        if(res.status == 201) {
            formNom.value = "";
            formFormateur.value = "";
            formCommercial.value = "";
            actionStore.fetchActions();
        }
    })
    .catch(err => {
        console.log(err);
    })

}

function handeFormateur(id) {
    formFormateur.value = id;
}

function handeCommercial(id) {
    formCommercial.value = id;
}

onMounted(() => {personStore.fetchPersons()})
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    row-gap: 1em;
}

fieldset, legend {
    border-width: 1px;
    border-style: solid;
    border-color: rgb(44, 62, 80);
}
legend {
    padding: 0.5em;
    border-radius: 0em;
    border-top-left-radius: 1em;
    border-bottom-right-radius: 1em;

}
</style>