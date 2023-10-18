<template>
  <main>
    <h2>
      🏭 <router-link to="/structure"> structure</router-link> ▶️
      {{ currentStructure?.nom }}
    </h2>

    <StructureForm :structure="currentStructure" @cancelEdit="fetchStructure" />

    <h3>Membres ({{ getPersonsByStructure(route.params.id).length }})</h3>
    <div
      v-for="person in getPersonsByStructure(route.params.id)"
      :key="person.id"
    >
      <router-link :to="{ name: 'personInfo', params: { id: person.id } }">
        {{ person.nom }}
      </router-link>
    </div>

    <!-- Structure {{ $route.params.id }} -->
  </main>
</template>

<script setup>
import { get } from "@/api/structureApi";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { usePersonStore } from "@/store/personStore";
import StructureForm from "./StructureForm.vue";
import router from "@/router";
const route = useRoute();
const personStore = usePersonStore();
const currentStructure = ref();

const { getPersonsByStructure } = personStore;

function fetchStructure() {
  currentStructure.value = get(route.params.id)
    .then((res) => {
      console.log("fetch structures", res.data);
      currentStructure.value = res.data;
    })
    .catch((err) => {
      console.log(err);
      router.push("/404");
    });
}

onMounted(() => {
  console.log("info for struct : ", route.params.id);
  fetchStructure();
});
</script>
