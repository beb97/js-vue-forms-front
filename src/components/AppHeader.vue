<template>
  <header>
    <div id="my-forms">
      <h1>👨‍🎓 My Forms</h1>
    </div>
    <nav>
      <!-- <router-link to="/">Home</router-link> -->
      <router-link to="/person">Persons</router-link>
      <router-link to="/action">Actions</router-link>
      <router-link to="/structure">Structures</router-link>
    </nav>
  </header>
</template>

<script setup></script>

<style scope>
header {
  display: flex;
  flex-direction: column;
  row-gap: 0.5em;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 2em;
}

#my-forms {
  display: flex;
  flex-direction: row;
}

nav {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  text-align: center;
  width: 100%;
  max-width: 300px;
}

a {
  flex-grow: 1;
  flex-basis: 100px;
}
</style>
