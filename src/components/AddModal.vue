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
    <div class="flex box-border mx-4">
      <span class="material-icons text-slate-500 text-3xl mr-1.5"> title </span>
      <input
        class="w-full py-1 px-2"
        type="text"
        name="title"
        id="edit-title"
        v-model="counterStore.tempDirectory.title"
        placeholder="Title"
        :maxlength="counterStore.title_max_length"
      />
    </div>
    <div class="flex box-border mx-4">
      <span class="material-icons text-slate-500 text-3xl mr-1.5"> link </span>
      <input
        v-model="counterStore.tempDirectory.url"
        class="w-full py-1 px-2"
        type="url"
        name="url"
        id="edit-url"
        placeholder="URL"
        required
      />
    </div>
    <div class="flex box-border mx-4">
      <span class="material-icons text-slate-500 text-3xl mr-1.5"> {{ counterStore.imageSourceType[0].icon }} </span>
      <label
        v-show="counterStore.imageSourceType[0].source == 'upload'"
        class="bg-white w-full truncate py-1 px-2"
        for="edit-image"
        id="label-image"
      >
        {{ counterStore.tempImageName }}
      </label>
      <label
        v-show="counterStore.imageSourceType[0].source == 'random'"
        class="bg-white w-full truncate py-1 px-2"
        id="label-image"
      >
        {{ counterStore.imageSourceType[0].placeholder }}
      </label>
      <input
        v-show="counterStore.imageSourceType[0].source == 'url'"
        v-model="counterStore.tempDirectory.image"
        class="w-full py-1 px-2"
        type="url"
        name="url"
        id="edit-url"
        :placeholder="counterStore.imageSourceType[0].placeholder"
      />
      <input
        type="file"
        name="image"
        id="edit-image"
        hidden
        accept="image/*"
        @change="loadImageFile($event)"
      />
      <button type="button" class="material-icons text-slate-500 text-2xl bg-white px-2" @click="counterStore.toggleImageSource()"> flip_camera_android </button>
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
