// Elements
var add;
var addCardBg;
var titleInput;
var urlInput;
var imageLabel;
var imageInput;

// Values
var cardCount;
var bgImage;
var directories = [];

const reader = new FileReader();

function init()
{
     add = document.getElementById("add-card");
     addCardBg = document.getElementById("add-card-bg");
     titleInput = document.getElementById("input-title");
     urlInput = document.getElementById("input-url");
     imageLabel = document.getElementById("label-image");
     imageInput = document.getElementById("input-image");

     directories.push(new Directory("Google", "https://www.google.com/"));
     directories.push(new Directory("Discord", "https://discord.com/"));

     cardCount = 0;
     for (let i = 0; i < directories.length; i++) {
          createDirectoryCard(directories[i]);
          cardCount++;
     }

     bgImage = "none";
     add.style.order = cardCount+1;
     
     // convert image file to base64 string on load of image
     reader.addEventListener("load", () => {
          bgImage = reader.result;
          addCardBg.style.backgroundImage = "url("+bgImage+")";
     });
}

function createDirectoryCard(dir)
{
     // Construct New Card
     let v = document.createElement('div');
     v.classList.add("card");
     v.classList.add("new-card");
     v.draggable = "true";
     if (bgImage != "none")
          v.style.backgroundImage = "url(" + dir.image + ")";

     let btnEdit = document.createElement('button');
     btnEdit.classList.add("edit-button");
     btnEdit.classList.add("hidden");
     btnEdit.classList.add("material-icons");
     btnEdit.textContent = "edit"
     
     let a = document.createElement('a');
     a.classList.add("card-url");
     a.href = dir.url;
     

     let emptyDiv = document.createElement('div');

     let p = document.createElement('p');
     p.textContent = dir.title;

     br = document.createElement('br');

     span = document.createElement('span');
     span.textContent = dir.url;

     v.appendChild(btnEdit);
     v.appendChild(a);
     a.appendChild(emptyDiv);
     a.appendChild(p);
     p.appendChild(br);
     p.appendChild(span);

     document.getElementById('grid').appendChild(v);
     cardCount++;

     resetAddCard()
     add.style.order = cardCount+1;
}

function createDirectory(e) {
     e.preventDefault()
     
     // Prepare values
     let titleText = titleInput.value;
     let urlText = urlInput.value;

     if (!urlText)
          return

     if (!titleInput.value)
          titleText = urlText;

     let newDir = bgImage != "none" ? new Directory(titleText, urlText, bgImage) : new Directory(titleText, urlText);
     directories.push(newDir);
     createDirectoryCard(newDir);
}

function resetAddCard() {
     titleInput.value = "";
     urlInput.value = "";
     bgImage = "none";
     addCardBg.style.backgroundImage = bgImage;
     console.log(imageLabel.textContent)
     imageLabel.textContent = "Browse..."
}

function updateImageDisplay(imgInput) {
     let file = imgInput.files[0];
     reader.readAsDataURL(file);
     imageLabel.textContent = file.name
}

function saveJsonFile()
{
     let dataStr = JSON.stringify(directories);
     let dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

     let fileName = "click_directory_backup.json";

     let linkElement = document.createElement('a');
     linkElement.setAttribute('href', dataUri);
     linkElement.setAttribute('download', fileName);
     linkElement.click();
}

class Directory {
     constructor(title, url, image = "test_image.jpg") {
          this.title = title;
          this.url = url;
          this.image = image;

          this.backgroundImage = function () {
               return "url(" + this.image + ")";
          };
     }
}

init();