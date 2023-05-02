//select all the elements and attributes that will be changed dynamically as we use our App, 
const addBox = document.querySelector(".add-box");
const popUpBox = document.querySelector(".popup-box");
const closeIcon = document.querySelector("header i");
const titleTag= document.querySelector("input");
const descTag= document.querySelector("textarea");
const addBtn = popUpBox.querySelector("button");
const popupTitle = document.querySelector("header p");
let isUpdate = true;
let UpdateId;

//create an array of the twelve months of the year 
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//add a new note once the add button is clicked.
addBox.addEventListener("click", function(){
   titleTag.focus();
    popUpBox.classList.add("show")
});
//close the opened new note
closeIcon.addEventListener("click", ()=>{
    popUpBox.classList.remove("show")
});

//save the information collected
addBtn.addEventListener("click", (e) => {
    e.preventDefault();
     let noteTitle = titleTag.value,
     noteDesc = descTag.value;
      if (noteTitle || noteDesc){
        let dateObj = new Date(),
        month = months[dateObj.getMonth()],
        day = dateObj.getDate(),
        year = dateObj.getFullYear();


        let noteInfo = {
            title: noteTitle, description: noteDesc,
            date: `${month} ${day} ${year}`
        }  
     if(!isUpdate){
             notes.push(noteInfo);
        }else {
            isUpdate = false;
            notes[UpdateId] = noteInfo
        } 
        
        localStorage.setItem("notes", JSON.stringify(notes));
        closeIcon.click()
        showNotes()
     }
});
//create an array variable to save all created notes notes
const notes = JSON.parse(localStorage.getItem("notes") || "[]");

//create a function that will show our notes once we load our App
function showNotes() {
    document.querySelectorAll(".note").forEach(note => note.remove())
  notes.forEach((note, index) => {
    let liTag = `  <li class="note">
      <div class="details">
          <p>${note.title}</p>
          <span>${note.description}</span>
      </div>
      <div class="bottom-content">
          <span>${note.date}</span>
          <div class="settings">
            <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
            <ul class="menu">
                <li onclick="updateNote(${index}, '${note.title}', '${note.description}')"><i class="uil uil-pen"></i>Edit</li>
                <li onclick="deleteNote(${index})"><i class="uil uil-trash"></i>Delete</li>
            </ul>
        </div>
      </div>
     </li>`;
     addBox.insertAdjacentHTML("afterend", liTag)
  });
};
showNotes(); 
//In the close button, we need to clear the inputs field when the popup is closed, 
closeIcon.addEventListener("click", ()=>{
    titleTag.value = "";
    descTag.value = "";
});
//edit or delete a note from the list
function showMenu(elem){
   elem.parentElement.classList.add("show")
    document.addEventListener("click", e =>{
        if(e.target.tagName != "I" || e.target != elem){
            elem.parentElement.classList.remove("show")
        }
    });
}
// delete the unwanted note, and update the note list in our storage by calling the showNotes(); function.
function deleteNote(noteId) {
    let confirmDel = confirm("Are you sure you want to delete this item?");
    if (!confirmDel) return;

    notes.splice(noteId, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}

function updateNote(noteId, title, desc) {
    isUpdate = true;
    UpdateId = noteId;
    addBox.click();
    titleTag.value = title;
    descTag.value = desc;
    addBtn.innerText = "Update Note";
    popupTitle.innerText = "Update a Note";
}
