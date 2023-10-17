<template>
  <h3 @click="$emit('cancelEdit')">
    {{ person ? "Modifier " + person?.nom + " ❌ " : "Ajouter personne" }}
  </h3>
  <form @submit.prevent="onSubmit">
    <input type="text" name="nom" placeholder="nom" v-model="form.nom" />

    <OptionSelect
      :options="structures"
      :size="1"
      :default="form.structureId"
      @selectedOption="handleStructure"
    />

    <input type="submit" :value="person ? 'Mofifier' : 'Ajouter'" />
  </form>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { post, put } from "@/api/person.api";
import { usePersonStore } from "@/store/person";
import { useStructureStore } from "@/store/structure";
import OptionSelect from "@/components/OptionSelect.vue";

const emit = defineEmits(["cancelEdit"]);
const props = defineProps(["person"]);

const form = ref({
  nom: "",
  structureId: 0,
});

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
        console.log("person created : ",res.data)
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
  form.value.nom = "";
  form.value.structureId = "0";
}

function initForm() {
  console.log("init form person", props.person);
  form.value.nom = props.person.nom;
  form.value.structureId = props.person.structure.id;
}

function handleStructure(id) {
  form.value.structureId = id;
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
