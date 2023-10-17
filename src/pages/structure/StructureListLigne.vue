<template>
  <tr>
    <td v-if="!isEditMode">{{ props.structure.nom }}</td>
    <td v-if="isEditMode">
      <form @submit.prevent="handleUpdate">
        <input type="text" name="nom" v-model="inputNom" />
        <input type="submit" value="Modifier" />
      </form>
    </td>
    <td @click="toogleEditMode"><a>🖊️</a></td>
    <td @click="handleDelete"><a>🗑️</a></td>
  </tr>
</template>

<script setup>
import { defineProps, ref, onMounted } from "vue";
import axios from "axios";
import { useStructureStore } from "../../store/structure";

const structureStore = useStructureStore();

const props = defineProps(["structure"]);
const inputNom = ref("");
const isEditMode = ref(false);

function toogleEditMode() {
  isEditMode.value = !isEditMode.value;
}

function handleDelete() {
  axios
    .delete(`/structure/${props.structure.id}`)
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        structureStore.fetchStructures();
      }
    })
    .catch((err) => console.log(err));
}

async function handleUpdate() {
  axios
    .put(`/structure/${props.structure.id}`, {
      nom: inputNom.value,
    })
    .then((res) => {
      console.log(res);
      if (res.status == 201) {
        structureStore.fetchStructures();
        toogleEditMode();
      }
    })
    .catch((err) => console.log(err));
}

onMounted(() => {
  inputNom.value = props.structure.nom;
});
</script>

<style scoped>
td {
  padding: 10px;
}
</style>
