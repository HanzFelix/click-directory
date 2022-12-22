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

function init()
{
     add = document.getElementById("add-card");
     addCardBg = document.getElementById("add-card-bg");
     titleInput = document.getElementById("input-title");
     urlInput = document.getElementById("input-url");
     imageLabel = document.getElementById("label-image");
     imageInput = document.getElementById("input-image");

     bgImage = "none";
     cardCount = 2;
     add.style.order = cardCount+1;
}

function addCard(e) {
     e.preventDefault()
     
     // Prepare values
     let titleText = titleInput.value;
     let urlText = urlInput.value

     if (!urlText)
          return

     if (!titleInput.value) {
          titleText = urlText;
     }
     

     // Construct New Card
     let v = document.createElement('div');
     v.classList.add("card");
     v.classList.add("new-card");
     v.draggable = "true";
     if (bgImage != "none")
          v.style.backgroundImage = "url("+bgImage+")";

     let btnEdit = document.createElement('button');
     btnEdit.classList.add("edit-button");
     btnEdit.classList.add("hidden");
     btnEdit.classList.add("material-icons");
     btnEdit.textContent = "edit"
     
     let a = document.createElement('a');
     a.classList.add("card-url");
     a.href = urlText;
     

     let emptyDiv = document.createElement('div');

     let p = document.createElement('p');
     p.textContent = titleText;

     br = document.createElement('br');

     span = document.createElement('span');
     span.textContent = urlText;

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
     return false;
}

function resetAddCard() {
     titleInput.value = "";
     urlInput.value = "";
     bgImage = "none";
     addCardBg.style.backgroundImage = bgImage;
     console.log(imageLabel.textContent)
     imageLabel.textContent = "Browse..."
}

function updateImageDisplay() {
     // TODO: accept only one image file
     let curFiles = imageInput.files;
     for(let file of curFiles) {
          bgImage = URL.createObjectURL(file);
          addCardBg.style.backgroundImage = "url("+bgImage+")";
          imageLabel.textContent = file.name
     }

}

function Directory(title, url, image)
{
     this.title = title;
     this.url = url;
     this.image = image;

     this.backgroundImage = function()
     {
          return "url(" + this.image + ")";   
     };
}

init();