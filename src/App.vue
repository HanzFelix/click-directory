<script setup>
import { RouterLink, RouterView } from "vue-router";
import DirectoryCard from "./components/DirectoryCard.vue";
import HelloWorld from "./components/HelloWorld.vue";
import CardItem from "./components/CardItem.vue";
import AddModal from "./components/AddModal.vue";
import EditModal from "./components/EditModal.vue";
import PopUpModal from "./components/PopUpModal.vue";
import { useCounterStore } from "./stores/counter";
import { ref } from "vue";

const counterStore = useCounterStore();
const reader = new FileReader();
const showEdit = ref(false);
const showAdd = ref(false);
function showEditModal(bool) {
  showEdit.value = bool;
}
function showAddModal(bool) {
  if (bool) counterStore.resetTempDirectory();

  showAdd.value = bool;
}

function loadJsonFile(e) {
  let file = e.target.files[0];
  reader.readAsText(file);
  reader.onload = (event) => {
    counterStore.loadJsonBackup(event.target.result);
  };
}
</script>
<template>
  <div class="flex-row-reverse flex gap-4 p-8  min-h-[20vw] md:min-h-[10vw] items-start">
    <label class="relative inline-flex items-center peer/a group cursor-pointer">
      <input type="checkbox" value="" class="sr-only peer group" v-model="counterStore.prevent_edit" />
      <div
        class="w-12 h-6 bg-slate-400 rounded-full peer peer-focus:after:bg-slate-200 peer-checked:hover:after:text-slate-600 peer-focus:after:text-slate-600 peer-checked:bg-slate-800 peer-checked:after:hover:bg-slate-200 peer-checked:after:translate-x-full  after:content-['drive\_file\_rename\_outline'] peer-checked:after:content-['lock'] after:absolute after:-top-1 after:-left-2 peer-checked:after:bg-slate-600 after:bg-slate-200 peer-checked:after:text-slate-300 after:text-slate-600 after:text-center after:pt-0.5 after:border-transparent after:border-2 after:rounded-full after:h-8 after:w-8 after:transition-all peer-checked:hover:bg-slate-600 material-icons transition-colors"
      ></div>
    </label>
    <span
      class="ml-3 text-sm font-medium peer/a peer-hover/a:text-slate-300 "
      :class="counterStore.prevent_edit ? 'text-slate-800':'text-slate-300'"
      >Edit Mode</span
    >
  </div>
  <main
    class="container mx-auto md:px-16 mb-[20vw] md:mb-[10vw] px-8 grid gap-6 grid-cols-2 grid-flow-row-dense md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    id="grid"
  >
    <!--Sample card-->
    <CardItem v-for="(directory, index) in counterStore.directories"
      ><DirectoryCard
        :id="index"
        :directory="directory"
        @edit="showEditModal(true)"
        @cancel="showEditModal(false)"
    /></CardItem>
    <!--CardItem><AddCard /></CardItem>
    <CardItem><EditCard /></CardItem-->
  </main>
  <footer
    class="w-full bg-slate-600 dark:bg-slate-700 dark:border-t border-slate-600 p-4 flex fixed bottom-0 justify-between"
  >
    <section class="">
      <button
        @click="showAddModal(true)"
        class="-translate-y-10 shadow-slate-500 dark:shadow-slate-900 dark:bg-slate-300 bg-slate-200 text-slate-700 items-center gap-1 flex absolute p-4 ml-4 shadow-sm rounded-xl hover:bg-slate-50 transition-colors"
      >
        <span class="material-icons">add</span>
        <span class="inline-block">Add</span>
      </button>
    </section>
    <section class="gap-4 flex">
      <!--button
        class="flex gap-2 hover:text-slate-50 text-slate-300 transition-colors"
        onclick="
     localStorage.clear()"
      >
        <span class="material-icons">delete</span>
        <span class="hidden md:inline-block">Reset to default</span>
      </button-->
      <button
        class="flex gap-2 hover:text-slate-50 text-slate-300 transition-colors"
        @click="counterStore.saveToJsonFile()"
      >
        <span class="material-icons">backup</span>
        <span class="hidden md:inline-block">Create backup</span>
      </button>
      <label
        class="flex cursor-pointer gap-2 hover:text-slate-50 text-slate-300 transition-colors"
        for="load-json"
      >
        <span class="material-icons"> settings_backup_restore </span>
        <span class="hidden md:inline-block">Restore from backup</span></label
      >
      <input
        class="hidden"
        type="file"
        id="load-json"
        @change="loadJsonFile($event)"
      />
      <a
        href="https://github.com/HanzFelix/click-directory"
        class="hover:fill-slate-50 fill-slate-300 transition-colors"
      >
        <svg
          height="24"
          aria-hidden="true"
          viewBox="0 0 16 16"
          version="1.1"
          width="24"
          data-view-component="true"
          class="octicon octicon-mark-github v-align-middle"
        >
          <path
            d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"
          ></path>
        </svg>
      </a>
    </section>
  </footer>

  <PopUpModal
    :show="showEdit"
    @close="showEditModal(false)"
    title="Edit Directory"
  >
    <template #body> <EditModal @close="showEditModal(false)" /> </template>
  </PopUpModal>

  <PopUpModal
    :show="showAdd"
    @close="showAddModal(false)"
    title="Add Directory"
  >
    <template #body> <AddModal @close="showAddModal(false)" /> </template>
  </PopUpModal>
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
