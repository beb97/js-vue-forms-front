<template>
  <h3 @click="$emit('cancelEdit')">
    {{ props.action ? "Mofifier " + action?.nom + " ❌ " : "Ajouter action" }}
  </h3>
  <form @submit.prevent="onSubmit">
    <div id="fields">
      <fieldset>
        <legend>🏭 Client</legend>
        <OptionSelect
          :options="structures"
          :default="form.structureId"
          :size="1"
          @selectedOption="handleStructure"
        />
        <input
          type="text"
          name="nom"
          placeholder="nom"
          v-model="form.nom"
          size="12"
          required
        />
      </fieldset>

      <fieldset>
        <legend>👩🏻‍🏫 Formateur</legend>

        <OptionSelect
          :options="persons"
          :default="form.formateurId"
          :size="4"
          @selectedOption="handleFormateur"
        />
      </fieldset>
      <fieldset>
        <legend>🥇 Centre de formation</legend>

        <OptionSelect
          :options="persons"
          :default="form.commercialId"
          :size="4"
          @selectedOption="handleCommercial"
        />
      </fieldset>
    </div>

    <input type="submit" :value="action ? 'Mofifier' : 'Ajouter'" />
  </form>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { post, put } from "@/api/action.api";
import { useActionStore } from "@/store/action";
import { usePersonStore } from "@/store/person";
import { useStructureStore } from "@/store/structure";
import OptionSelect from "@/components/OptionSelect.vue";

const emit = defineEmits(["cancelEdit"]);

const actionStore = useActionStore();
const personStore = usePersonStore();
const structureStore = useStructureStore();

const props = defineProps(["action"]);

const form = ref({
  nom: "",
  formateurId: 0,
  commercialId: 0,
  structureId: 0,
});

const persons = computed(() => {
  return personStore.persons;
});

const structures = computed(() => {
  return structureStore.structures;
});

async function onSubmit() {
  if (props.action) {
    handleUpdate();
  } else {
    handlePost();
  }
}

async function handleUpdate() {
  console.log("updating action");
  put(props.action.id, form.value)
    .then((res) => {
      console.log("updated action :", res);
      console.log(res);
      if (res.status == 201) {
        console.log("action edited:", res.data);
        actionStore.refreshActions();
        emit("cancelEdit");
      }
    })
    .catch((err) => console.log(err));
}
async function handlePost() {
  console.log("creating action");
  //   if (!e.target.checkValidity()) {
  //     console.log("formulaire invalide");
  //     e.target.reportValidity();
  //     return false;
  //   }

  post(form.value)
    .then((res) => {
      console.log(res);
      if (res.status == 201) {
        console.log("action created:", res.data);
        actionStore.refreshActions();
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

watch(
  () => props.action,
  (newAction) => {
    console.log("watching structure : ", newAction);
    if (newAction) {
      initForm();
    } else {
      resetForm();
    }
  }
);

function resetForm() {
  form.value.nom = "";
  form.value.formateurId = 0;
  form.value.commercialId = 0;
  form.value.structureId = 0;
}

function initForm() {
  console.log("init form action", props.action);
  form.value.nom = props.action.nom;
  form.value.formateurId = props.action.formateur.id;
  form.value.commercialId = props.action.commercial.id;
  form.value.structureId = props.action.structure.id;
}

function handleFormateur(id) {
  form.value.formateurId = id;
}

function handleCommercial(id) {
  form.value.commercialId = id;
}

function handleStructure(id) {
  form.value.structureId = id;
}

onMounted(() => {
  personStore.initPersons();
  structureStore.initStructures();
});
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

fieldset,
legend {
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
  background-color: rgba(138, 138, 138, 0.5);
}
</style>
