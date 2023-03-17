<script setup>
import { ref } from "vue";
import { useCounterStore } from "../stores/counter";
const emit = defineEmits(["close"]);
const counterStore = useCounterStore();

const reader = new FileReader();

function createDir() {
  counterStore.createDirectory();
  emit("close");
}

function loadImageFile(e) {
  let file = e.target.files[0];
  counterStore.tempImageName = file.name;
  reader.readAsDataURL(file);
  reader.onload = (event) => {
    counterStore.tempDirectory.image = event.target.result;
  };
}
</script>
<template>
  <form
    class="card-form card-add h-full w-full flex flex-col justify-between md:justify-end pt-2 gap-2 rounded-2xl"
    id="edit-form"
    action="#"
    autocomplete="off"
  >
    <div class="flex box-border gap-1.5 mx-4">
      <span class="material-icons text-slate-500 text-3xl rou"> title </span>
      <input
        class="w-full py-1 px-2"
        type="text"
        name="title"
        id="edit-title"
        v-model="counterStore.tempDirectory.title"
        placeholder="Title"
        maxlength="64"
      />
    </div>
    <div class="flex box-border gap-1.5 mx-4">
      <span class="material-icons text-slate-500 text-3xl"> link </span>
      <input
        v-model="counterStore.tempDirectory.url"
        class="w-full py-1 px-2"
        type="url"
        name="url"
        id="edit-url"
        placeholder="URL"
      />
    </div>
    <div class="flex box-border gap-1.5 mx-4">
      <span class="material-icons text-slate-500 text-3xl"> wallpaper </span>
      <label
        class="bg-white w-full truncate py-1 px-2"
        for="edit-image"
        id="label-image"
      >
        {{ counterStore.tempImageName }}
      </label>
      <input
        type="file"
        name="image"
        id="edit-image"
        hidden
        accept="image/*"
        @change="loadImageFile($event)"
      />
    </div>
    <footer class="flex box-border h-8 gap-1.5 material-icons">
      <button
        class="w-full bg-slate-600 transition-colors text-green-600 hover:bg-green-600 hover:text-white first:rounded-bl-xl last:rounded-br-xl"
        value="update"
        @click.stop.prevent="createDir"
      >
        check
      </button>
    </footer>
  </form>
</template>
