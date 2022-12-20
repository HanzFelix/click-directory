var add = document.getElementById("add-card");
//const gridComputedStyle = getComputedStyle(document.getElementById("grid"));
var cardCount = 2;
add.style.order = cardCount+1;

var addCardBg = document.getElementById("add-card-bg");
var titleInput = document.getElementById("input-title");
var urlInput = document.getElementById("input-url");
var imageLabel = document.getElementById("label-image");
var imageInput = document.getElementById("input-image");
var bgImage = "none";

function addCard() {
     // Prepare values
     var titleText = titleInput.value;
     var urlText = urlInput.value

     if (!urlText)
          return

     if (!titleInput.value) {
          titleText = urlText;
     }
     

     // Construct New Card
     var v = document.createElement('div');
     v.classList.add("card");
     v.classList.add("new-card");
     v.draggable = "true";
     if (bgImage != "none")
          v.style.backgroundImage = bgImage;

     var btnEdit = document.createElement('button');
     btnEdit.classList.add("edit-button");
     btnEdit.classList.add("hidden");
     btnEdit.classList.add("material-icons");
     btnEdit.textContent = "edit"
     
     var a = document.createElement('a');
     a.classList.add("card-url");
     a.href = urlInput;
     

     var emptyDiv = document.createElement('div');

     var p = document.createElement('p');
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

     //resetAddCard()
     add.style.order = cardCount+1;
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
     const curFiles = imageInput.files;
     for(const file of curFiles) {
          bgImage = "url("+URL.createObjectURL(file)+")";
          addCardBg.style.backgroundImage = bgImage;
          imageLabel.textContent = file.name
     }

}