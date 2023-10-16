<template>
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>Forms by PB</h1>
    <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/person">Persons</router-link>
        <router-link to="/action">Actions</router-link>
    </nav>
</template>

<script setup>
</script>

<style scope>
nav {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    max-width: 300px;
}

a {
    flex-grow: 1;
    flex-basis: 100px;
}
</style>