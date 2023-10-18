<template>
  <h3 @click="$emit('cancelEdit')">
    {{ props.action ? "🖊️" + action?.nom + " ❌ " : "Ajouter action" }}
  </h3>
  <form @submit.prevent="onSubmit">
    <div id="fields">
      <fieldset>
        <legend>🥇 Centre de formation</legend>
        <h3>Entreprise</h3>
        <select><option>TODO</option></select>
        <h3>Commercial</h3>
        <select v-model="form.commercialId" :size="selectSize">
          <!-- <option disabled value="">Select one</option> -->
          <option
            v-for="structure in commerciaux"
            :value="structure.id"
            :key="structure.id"
          >
            {{ structure.nom }}
          </option>
        </select>
      </fieldset>

      <fieldset>
        <legend>🏭 Client</legend>
        <h3>Entreprise</h3>
        <select><option>TODO</option></select>
        <h3>Contact</h3>
        <select v-model="form.structureId" :size="selectSize">
          <!-- <option disabled value="">Select one</option> -->
          <option
            v-for="structure in clients"
            :value="structure.id"
            :key="structure.id"
          >
            {{ structure.nom }}
          </option>
        </select>
      </fieldset>

      <fieldset>
        <legend>👩🏻‍🏫 Formateur</legend>
        <h3>Entreprise</h3>
        <select><option>TODO</option></select>
        <h3>Formateur</h3>
        <select v-model="form.formateurId" :size="selectSize">
          <!-- <option disabled value="">Select one</option> -->
          <option
            v-for="person in formateurs"
            :value="person.id"
            :key="person.id"
          >
            {{ person.nom }}
          </option>
        </select>
      </fieldset>
    </div>
    <input
      type="text"
      name="nom"
      placeholder="nom de la formation"
      v-model="form.nom"
      size="12"
      required
    />

    <input type="submit" :value="action ? 'Mofifier' : 'Ajouter'" />
  </form>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { post, put } from "@/api/actionApi";
import { useActionStore } from "@/store/actionStore";
import { usePersonStore } from "@/store/personStore";
import { useStructureStore } from "@/store/structureStore";
import Action, { ActionDTO } from "@/model/Action";
import { StructureType } from "@/model/Structure";

const emit = defineEmits(["cancelEdit"]);

const actionStore = useActionStore();
const personStore = usePersonStore();
const structureStore = useStructureStore();

const props = defineProps(["action"]);

const form = ref(new ActionDTO());
const selectSize=ref(5);

const clients = computed(() => {
  return structureStore.structures.filter(
    (struc) => struc.type == StructureType.CLIENT.name
  );
});

const commerciaux = computed(() => {
  return personStore.persons.filter(
    (person) => person.structure.type == StructureType.ORGANISME.name
  );
});

const formateurs = computed(() => {
  return personStore.persons.filter(
    (person) => person.structure.type == StructureType.INDEPENDANT.name
  );
});

// const structures = computed(() => {
//   return structureStore.structures;
// });

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
  form.value = new ActionDTO();
  selectSize.value=5;
}

function initForm() {
  console.log("init form action", props.action);
  selectSize.value=1;
  form.value = new Action(props.action);
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
