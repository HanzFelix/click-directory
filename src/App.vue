<script setup>
import { RouterLink, RouterView } from "vue-router";
import DirectoryCard from "./components/DirectoryCard.vue";
import HelloWorld from "./components/HelloWorld.vue";
import CardItem from "./components/CardItem.vue";
import AddCard from "./components/AddCard.vue";
import EditCard from "./components/EditCard.vue";
</script>
<template>
  <main
    class="container mx-auto md:px-16 my-[10vw] px-8 grid gap-6 grid-cols-2 grid-flow-row-dense md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    id="grid"
  >
    <!--Sample card-->
    <CardItem v-for="i in 5"><DirectoryCard /></CardItem>
    <CardItem><AddCard /></CardItem>
    <!--temp-->
    <CardItem><EditCard /></CardItem>
  </main>
  <nav class="w-full bg-slate-600 p-4 flex gap-4 fixed bottom-0 justify-end">
    <button class="text-slate-200 flex gap-2" onclick="deleteLocalStorage()">
      <span class="material-icons">delete</span>
      <span class="hidden md:inline-block">Reset to default</span>
    </button>
    <button class="text-slate-200 flex gap-2" onclick="saveToJsonFile()">
      <span class="material-icons">backup</span>
      <span class="hidden md:inline-block">Create backup</span>
    </button>
    <label class="text-slate-200 flex cursor-pointer gap-2" for="load-json"
      ><span class="material-icons">settings_backup_restore</span>

      <span class="hidden md:inline-block">Restore from backup</span></label
    >
    <input class="hidden" type="file" id="load-json" />
  </nav>
</template>
<!--template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style-->
