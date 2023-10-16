<template>
    <h2>Ajouter</h2>
    <form  @submit.prevent="onSubmit">
        <div id="fields">

            <fieldset>
                <legend>🏭 Client</legend>
                <OptionSelect :options="structures" :size="1" @selectedOption="handleStructure"/>
                <input type="text" name="nom" placeholder="nom" v-model="formNom" size="12" required/>
            </fieldset>
            <fieldset>
                <legend>👩🏻‍🏫 Formateur</legend>
                
                <OptionSelect :options="persons" :size="4" @selectedOption="handleFormateur"/>
            </fieldset>
            <fieldset>
                <legend>📃 Centre de formation</legend>
                
                <OptionSelect :options="persons" :size="4" @selectedOption="handleCommercial"/>
            </fieldset>
        </div>
            
        <input type="submit" value="Ajouter"/>
    </form>
</template>

<script setup>
import { ref, computed, onMounted} from 'vue'
import axios from 'axios'
import {useActionStore} from '../../store/action'
import {usePersonStore} from '../../store/person'
import {useStructureStore} from '../../store/structure';
import OptionSelect from '../../components/OptionSelect.vue';

const actionStore = useActionStore();
const personStore = usePersonStore();
const structureStore = useStructureStore();

const formNom = ref("");
const formFormateur = ref(0);
const formCommercial = ref(0);

const persons = computed(() => {
  return personStore.persons;
});

const structures = computed(() => {
  return structureStore.structures;
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
            actionStore.fetchActions();
        }
    })
    .catch(err => {
        console.log(err);
    })

}

function handleFormateur(id) {
    formFormateur.value = id;
}

function handleCommercial(id) {
    formCommercial.value = id;
}

function handleStructure(id) {
    console.log(id);
}


onMounted(() => {
    personStore.fetchPersons();
    structureStore.fetchStructures();
})

</script>

<style scoped>
form {
    box-sizing: border-box;
    padding: 0px 1em;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;
    row-gap: 1em;
}

#fields {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    flex-grow: 1;
}

fieldset, legend {
    border-width: 1px;
    border-style: solid;
    border-color: rgb(44, 62, 80);
    flex-basis: 120px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}

legend {
    padding: 0.5em;
    border-radius: 0em;
    border-top-left-radius: 1em;
    border-bottom-right-radius: 1em;
}
</style>