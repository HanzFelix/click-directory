import { ref, computed } from "vue";
import { defineStore, mapActions } from "pinia";
/*import defaultBg from '../images/default_directory_bg.png'
import defaultBg1 from '../images/default_bg_1.jpg'
import defaultBg2 from '../images/default_bg_2.jpg'
import defaultBg3 from '../images/default_bg_3.jpg'
import defaultBg4 from '../images/default_bg_4.jpg'*/

const defaultBg = "./images/default_directory_bg.png";
const defaultBg1 = "./images/default_bg_1.jpg";
const defaultBg2 = "./images/default_bg_2.jpg";
const defaultBg3 = "./images/default_bg_3.jpg";
const defaultBg4 = "./images/default_bg_4.jpg";

const defaultDirectory = {
  title: "Example",
  url: "https://example.com/",
  image: defaultBg,
};

// const defaultImages = [defaultBg];

const defaultImages = [
  defaultBg,
  defaultBg1,
  defaultBg2,
  defaultBg3,
  defaultBg4,
];
/*
const defaultImages = [
  "../images/default_directory_bg.png",
  "../images/default_bg_1.jpg",
  "../images/default_bg_2.jpg",
  "../images/default_bg_3.jpg",
  "../images/default_bg_4.jpg"
]*/

export const useCounterStore = defineStore("counter", {
  state: () => ({
    currentId: 0,
    imageSourceType: [
      {
        source: "upload",
        icon: "add_photo_alternate",
        placeholder: "Browse from files...",
      },
      {
        source: "url",
        icon: "satellite",
        placeholder: "Use image from URL",
      },
      {
        source: "random",
        icon: "collections",
        placeholder: "Randomize image selection",
      },
    ],
    tempDirectory: {
      title: "",
      url: "",
      image: "none",
    },
    tempImageName: "Browse...",
    directories: localStorage.getItem("directories")
      ? JSON.parse(localStorage.getItem("directories"))
      : [defaultDirectory],
    title_max_length: 40,
    prevent_edit: true,
  }),
  getters: {
    defaultDirectory(state) {
      return defaultDirectory;
    },
  },
  actions: {
    createDirectory() {
      if (!this.tempDirectory.url) return false;

      if (!this.tempDirectory.title)
        this.tempDirectory.title = this.tempDirectory.url
          .toString()
          .substring(0, this.title_max_length);

      if (this.tempDirectory.image == "none")
        this.tempDirectory.image =
          defaultImages[Math.floor(Math.random() * defaultImages.length)];

      // add directory and reset
      this.directories.push(this.tempDirectory);
      this.resetTempDirectory();
      localStorage.setItem("directories", JSON.stringify(this.directories));
      return true;
    },
    loadDirectory(id) {
      this.currentId = id;
      this.tempDirectory = {
        title: this.directories[id].title,
        url: this.directories[id].url,
        image: this.directories[id].image,
      };
      while (this.imageSourceType[0].source != "upload") {
        this.toggleImageSource("edit");
      }
    },
    updateDirectory() {
      // self-correcting
      if (!this.tempDirectory.url) return false;

      if (!this.tempDirectory.title)
        this.tempDirectory.title = this.tempDirectory.url
          .toString()
          .substring(0, this.title_max_length);

      if (
        this.tempDirectory.image == "none" ||
        this.imageSourceType[0].source == "random"
      )
        this.tempDirectory.image =
          defaultImages[Math.floor(Math.random() * defaultImages.length)];

      // update directory and reset
      this.directories[this.currentId] = this.tempDirectory;
      this.resetTempDirectory();
      localStorage.setItem("directories", JSON.stringify(this.directories));

      return true;
    },
    deleteDirectory() {
      this.directories.splice(this.currentId, 1);
      localStorage.setItem("directories", JSON.stringify(this.directories));
      return true;
    },
    // resets the directory
    resetTempDirectory() {
      while (this.imageSourceType[0].source != "upload") {
        this.toggleImageSource("reset");
      }

      this.tempDirectory = {
        title: "",
        url: "",
        image: "none",
      };
      this.tempImageName = "Browse..."; // seems redundant for toggleImageSource()
    },
    loadJsonBackup(file) {
      let x = JSON.parse(file);
      if (!x[0].title && !x[0].url) {
        alert("invalid file");
        return false;
      }
      localStorage.setItem("directories", file);
      this.directories = x;
      return true;
    },
    saveToJsonFile() {
      let dataStr = JSON.stringify(this.directories);
      let dataUri =
        "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

      let fileName = "click_directory_backup_" + new Date().toJSON() + ".json";

      let linkElement = document.createElement("a");
      linkElement.setAttribute("href", dataUri);
      linkElement.setAttribute("download", fileName);
      linkElement.click();
    },
    toggleImageSource(type) {
      this.imageSourceType.push(this.imageSourceType.shift());
      if (type == "edit") return;
      if (this.imageSourceType[0].source == "url") {
        this.tempDirectory.image = "";
        this.tempImageName = "Browse...";
      } else {
        //this.tempDirectory.image = "none";
      }
    },
    repositionDirectory(fromIndex, toIndex) {
      if(toIndex < 0 || toIndex > this.directories.length) return;
      
      var element = this.directories[fromIndex];
      this.directories.splice(fromIndex, 1);
      this.directories.splice(toIndex, 0, element);
      
      localStorage.setItem("directories", JSON.stringify(this.directories));
  }
  
  },
});

//todo
//remove id in directory?
