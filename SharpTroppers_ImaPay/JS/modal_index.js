const modal = document.getElementById("myModal");
const close = document.getElementsByClassName("close")[0];
const checkbox = document.getElementById('terms-and-conditions');

setTimeout(() => {
  modal.style.display = "block";
}, 1000);

checkbox.addEventListener("change", validaCheckbox, false);
function validaCheckbox()
{
   const checked = checkbox.checked;
if(checked){
      terms_changed(checkbox)
      close.onclick = function () {
        modal.style.display = "none";
      }
  }
  if (!checked ) {
    terms_changed(checkbox)
  }
}
function terms_changed(termsCheckBox){
  close.disabled = !termsCheckBox.parentElement.querySelectorAll("input[type=checkbox]:checked").length;
} 
