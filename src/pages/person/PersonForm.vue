<template>
  <h3 @click="$emit('cancelEdit')">
    {{ person ? "🖊️" + person?.nom + " ❌ " : "Ajouter acteur" }}
  </h3>
  <form @submit.prevent="onSubmit">
    <input type="text" name="nom" placeholder="nom" v-model="form.nom" />

    <select v-model="form.structureId" size="5">
      <!-- <option disabled value="">Select one</option> -->
      <option
        v-for="structure in structures"
        :value="structure.id"
        :key="structure.id"
      >
        {{ structure.nom }}
      </option>
    </select>

    <input type="submit" :value="person ? 'Mofifier' : 'Ajouter'" />
  </form>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { post, put } from "@/api/personApi";
import { usePersonStore } from "@/store/personStore";
import { useStructureStore } from "@/store/structureStore";
import Person, { PersonDTO } from "@/model/Person";

const emit = defineEmits(["cancelEdit"]);
const props = defineProps(["person"]);

const form = ref(new PersonDTO());

const personStore = usePersonStore();
const structureStore = useStructureStore();

const structures = computed(() => {
  return structureStore.structures;
});

async function onSubmit() {
  if (props.person) {
    handleUpdate();
  } else {
    handlePost();
  }
}

async function handlePost() {
  post(form.value)
    .then((res) => {
      console.log(res);
      if (res.status == 201) {
        console.log("person created : ", res.data);
        personStore.refreshPersons();
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

async function handleUpdate() {
  put(props.person.id, form.value)
    .then((res) => {
      console.log(res);
      if (res.status == 201) {
        personStore.refreshPersons();
        emit("cancelEdit");
      }
    })
    .catch((err) => console.log(err));
}

function resetForm() {
  form.value = new PersonDTO();
}

function initForm() {
  console.log("init form person", props.person);
  form.value = new Person(props.person);
  console.log("form now equals: ", form.value)
}

watch(
  () => props.person,
  (newPers) => {
    console.log("watching person : ", newPers);
    if (newPers) {
      initForm();
    } else {
      resetForm();
    }
  }
);

onMounted(() => {
  structureStore.initStructures();
});
</script>

<style scoped></style>
