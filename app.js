let btnSave = document.getElementById("saveBtn");
let inputNote = document.getElementById("noteInput");
let container = document.getElementById("noteContainer");

console.log(btnSave);
console.log(inputNote);
console.log(container);
btnSave.addEventListener('click', function() {
    if (inputNote.value !== ' ') { 
        let noteItem = document.createElement('li');
        noteItem.textContent = inputNote.value;
        container.appendChild(noteItem);
        inputNote.value = '';
    }
});
