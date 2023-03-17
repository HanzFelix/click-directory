import { ref, computed } from "vue";
import { defineStore, mapActions } from "pinia";
import defaultBg1 from '../assets/default_bg_1.jpg'
import defaultBg2 from '../assets/default_bg_1.jpg'
import defaultBg3 from '../assets/default_bg_1.jpg'
import defaultBg4 from '../assets/default_bg_1.jpg'

const defaultDirectory = {
  title: "Example",
  url: "https://example.com/",
  image: defaultBg1,
};

const defaultImages = [
  defaultBg1,
  defaultBg2,
  defaultBg3,
  defaultBg4,
];

export const useCounterStore = defineStore("counter", {
  state: () => ({
    currentId: 0,
    tempDirectory: {
      title: "",
      url: "",
      image: "none",
    },
    tempImageName: "Browse...",
    directories: localStorage.getItem("directories")
      ? JSON.parse(localStorage.getItem("directories"))
      : [defaultDirectory],
  }),
  getters: {
    defaultDirectory(state) {
      return defaultDirectory;
    },
  },
  actions: {
    createDirectory() {
      if (!this.tempDirectory.title)
        this.tempDirectory.title = this.tempDirectory.url
          .toString()
          .substring(0, 64);

      if (this.tempDirectory.image == "none")
        this.tempDirectory.image =
          defaultImages[Math.floor(Math.random() * defaultImages.length)];

      // add directory and reset
      this.directories.push(this.tempDirectory);
      this.tempDirectory = {
        title: "",
        url: "",
        image: "none",
      };
      this.tempImageName = "Browse...";
      localStorage.setItem("directories", JSON.stringify(this.directories));
    },
    loadDirectory(id) {
      this.currentId = id;
      this.tempDirectory = {
        title: this.directories[id].title,
        url: this.directories[id].url,
        image: this.directories[id].image,
      };
    },
    updateDirectory() {
      // self-correcting
      if (!this.tempDirectory.title)
        this.tempDirectory.title = this.tempDirectory.url
          .toString()
          .substring(0, 64);

      if (this.tempDirectory.image == "none")
        this.tempDirectory.image = getRandomArrayElement(defaultImages);

      // update directory and reset
      this.directories[this.currentId] = this.tempDirectory;
      this.tempDirectory = {
        title: "",
        url: "",
        image: "none",
      };
      this.tempImageName = "Browse...";
      localStorage.setItem("directories", JSON.stringify(this.directories));

      return true;
    },
    deleteDirectory() {
      this.directories.splice(this.currentId, 1);
      localStorage.setItem("directories", JSON.stringify(this.directories));
      return true;
    },
    resetTempDirectory() {
      this.tempDirectory = {
        title: "",
        url: "",
        image: "none",
      };
    },
    loadJsonBackup(file) {
      let x = JSON.parse(file);
      if (!x[0].title && !x[0].url) {
        alert("invalid file");
        return false;
      }
      localStorage.setItem('directories', file);
      this.directories = x;
      return true
    },
    saveToJsonFile()
    {
         let dataStr = JSON.stringify(this.directories);
         let dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    
         let fileName = "click_directory_backup_" + new Date().toJSON() + ".json";
    
         let linkElement = document.createElement('a');
         linkElement.setAttribute('href', dataUri);
         linkElement.setAttribute('download', fileName);
         linkElement.click();
    }
  },
});

//todo
//remove id in directory?
