<template>
  <form @submit.prevent="onSubmit">
    <h3 @click="$emit('cancelEdit')">
      {{
        props.structure
          ? "Mofifier " + structure?.nom + " ❌ "
          : "Ajouter structure"
      }}
    </h3>
    <input type="text" name="nom" placeholder="nom" v-model="form.nom" />
    <input type="submit" :value="structure ? 'Mofifier' : 'Ajouter'" />
  </form>
</template>

<script setup>
import { post, put } from "@/api/structure.api";
import { useStructureStore } from "@/store/structure";
import { onMounted, ref, watch } from "vue";

const emit = defineEmits(["cancelEdit"]);

const structureStore = useStructureStore();
// const method = ref("post"); // METHOD BY DEFAULT
const props = defineProps(["structure"]);
const form = ref({
  nom: "",
});

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
  form.value.nom = "";
}

function initForm() {
  console.log("init form struct", props.structure);
  form.value.nom = props.structure.nom;
}


onMounted(() => {});
</script>

<style scoped></style>
