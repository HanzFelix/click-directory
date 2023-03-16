<script setup>
import { ref } from "vue";

const title = ref("");
const url = ref("");
const imageName = ref("Browse...");
const reader = new FileReader();

function loadImageFile(e) {
  let file = e.target.files[0];
  imageName.value = file.name;
  reader.readAsDataURL(file);
}
</script>
<template>
  <form
    class="card-form card-add bg-cover bg-left bg-slate-300 h-full w-full hidden md:flex flex-col justify-end pt-3 gap-1 rounded-xl"
    id="add-form"
    action="#"
    autocomplete="off"
  >
    <div class="flex box-border gap-1.5 mx-2">
      <span class="material-icons text-slate-500"> title </span>
      <input
        v-model="title"
        class="w-full px-1"
        type="text"
        name="title"
        id="input-title"
        placeholder="Title"
        maxlength="64"
      />
    </div>
    <div class="row flex box-border gap-1.5 mx-2">
      <span class="material-icons text-slate-500"> link </span>
      <input
        v-model="url"
        class="w-full px-1"
        type="url"
        name="url"
        id="input-url"
        placeholder="URL"
      />
    </div>
    <div class="row flex box-border gap-1.5 mx-2">
      <span class="material-icons text-slate-500"> wallpaper </span>
      <label
        for="input-image"
        class="bg-white w-full truncate px-1"
        id="label-edit-image"
      >
        {{ imageName }}
      </label>
      <input
        type="file"
        @change="loadImageFile($event)"
        name="image"
        id="input-image"
        hidden
        accept="image/*"
      />
    </div>
    <div class="row button-row flex box-border gap-1.5 material-icons">
      <button
        class="w-full text-slate-600 hover:bg-slate-600 hover:text-white first:rounded-bl-xl last:rounded-br-xl bg-slate-300"
      >
        add
      </button>
    </div>
  </form>
  <div
    class="h-full w-full flex items-end justify-end p-4 md:hidden text-right bg-slate-500 rounded-xl"
  >
    <span class="text-xl text-slate-300 font-bold">Create Directory</span>
  </div>
</template>
