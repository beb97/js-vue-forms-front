<template>
  <main>
    <h2>
      📒 <router-link to="/action"> action </router-link> ▶️
      {{ currentAction?.nom }}
    </h2>

    <ActionForm :action="currentAction" @cancelEdit="fetchAction" />
  </main>
</template>

<script setup>
import { get } from "@/api/actionApi";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
// import { useActionStore } from "@/store/actionStore";
import ActionForm from "./ActionForm.vue";
import router from "@/router";
const route = useRoute();
// const actionStore = useActionStore();
const currentAction = ref();

function fetchAction() {
  currentAction.value = get(route.params.id)
    .then((res) => {
      console.log("fetch actions", res.data);
      currentAction.value = res.data;
    })
    .catch((err) => {
      console.log(err);
      router.push("/404");
    });
}

onMounted(() => {
  console.log("info for struct : ", route.params.id);
  fetchAction();
});
</script>
