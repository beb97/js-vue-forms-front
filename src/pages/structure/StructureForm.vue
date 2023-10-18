<template>
  <form @submit.prevent="onSubmit">
    <h3 @click="$emit('cancelEdit')">
      {{
        props.structure ? "🖊️" + structure?.nom + " ❌ " : "Ajouter structure"
      }}
    </h3>
    <input type="text" name="nom" placeholder="nom" v-model="form.nom" />
    <select v-model="form.type" size="3">
      <option v-for="type in StructureType.asArray()" :value="type" :key="type">
        {{ type }}
      </option>
    </select>
    <input type="submit" :value="structure ? 'Mofifier' : 'Ajouter'" />
  </form>
</template>

<script setup lang="ts">
import { post, put } from "@/api/structureApi";
import Structure, { StructureDTO, StructureType } from "@/model/Structure";
// import Structure from "@/model/Structure";
import { useStructureStore } from "@/store/structureStore";
import { onMounted, ref, watch } from "vue";

const emit = defineEmits(["cancelEdit"]);

const structureStore = useStructureStore();

const props = defineProps(["structure"]);
const form = ref(new StructureDTO());

async function onSubmit() {
  if (props.structure) {
    handleUpdate();
  } else {
    handlePost();
  }
}

async function handleUpdate() {
  console.log("updating struct");
  put(props.structure.id, form.value)
    .then((res) => {
      console.log("updated struct :", res);
      if (res.status == 201) {
        console.log("struct edited:", res.data);
        structureStore.refreshStructures();
        emit("cancelEdit");
      }
    })
    .catch((err) => console.log(err));
}

async function handlePost() {
  console.log("creating struct");
  post(form.value)
    .then((res) => {
      console.log(res);
      if (res.status == 201) {
        console.log("struct created:", res.data);
        structureStore.refreshStructures();
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

// https://stackoverflow.com/questions/59125857/how-to-watch-props-change-with-vue-composition-api-vue-3
watch(
  () => props.structure,
  (newStruct) => {
    console.log("watching structure : ", newStruct);
    if (newStruct) {
      initForm();
    } else {
      resetForm();
    }
  }
);

function resetForm() {
  form.value = new StructureDTO();
}

function initForm() {
  console.log("init form struct", props.structure);
  form.value = new Structure(props.structure);
}

onMounted(() => {});
</script>

<style scoped></style>
