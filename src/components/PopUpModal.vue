<script setup>
import { useCounterStore } from "../stores/counter";

const counterStore = useCounterStore();
const props = defineProps({
  show: { default: false },
  title: { type: String, default: "Modal" },
  message: { type: String, default: "No Message" },
});

const emit = defineEmits(["close"]);
function emitAsClose() {
  emit("close");
}
</script>

<template>
  <!-- Model Background -->
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50 px-8"
  >
    <!-- Modal content -->
    <div
      class="relative flex max-w-xl w-96 flex-col rounded-2xl bg-slate-300 shadow-md bg-cover bg-center"
      :style="{
        'background-image': 'url(' + counterStore.tempDirectory.image + ')',
      }"
    >
      <!-- Modal header -->
      <header class="flex items-start justify-between rounded-t pt-4 pr-2 pl-4">
        <h3 class="text-xl text-slate-100 mix-blend-difference">
          {{ title }}
        </h3>
        <button
          type="button"
          @click="emitAsClose"
          class="ml-auto inline-flex items-center rounded-lg p-1.5 text-sm text-zinc-400 hover:bg-zinc-200 hover:text-orange-600 transition-colors"
          data-modal-hide="defaultModal"
        >
          <svg
            aria-hidden="true"
            class="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
      </header>
      <!-- Modal body -->
      <slot name="body">
        <div class="p-2">
          <p class="text-base leading-relaxed">
            {{ message }}
          </p>
        </div>
        <!-- Modal footer -->
        <footer class="flex flex-row-reverse flex-wrap-reverse gap-x-2">
          <!--ButtonAlternative text="Cancel" :click-action="emitAsCancel" />
        <ButtonPrimary
          text="Delete"
          :click-action="emitAsConfirm"
          variant="Danger"
        /-->
        </footer>
      </slot>
    </div>
  </div>
</template>
