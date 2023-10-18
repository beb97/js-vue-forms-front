<template>
  <main>
    <h2>
      🧠 <router-link to="/person"> acteur </router-link> ▶️
      {{ currentPerson?.nom }}
    </h2>

    <PersonForm :person="currentPerson" @cancelEdit="fetchPerson" />
  </main>
</template>

<script setup>
import { get } from "@/api/personApi";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
// import { usePersonStore } from "@/store/personStore";
import PersonForm from "./PersonForm.vue";
import router from "@/router";
const route = useRoute();
// const personStore = usePersonStore();
const currentPerson = ref();

function fetchPerson() {
  currentPerson.value = get(route.params.id)
    .then((res) => {
      console.log("fetch persons", res.data);
      currentPerson.value = res.data;
    })
    .catch((err) => {
      console.log(err);
      router.push("/404");
    });
}

onMounted(() => {
  console.log("info for struct : ", route.params.id);
  fetchPerson();
});
</script>
