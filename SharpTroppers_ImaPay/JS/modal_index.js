const modal = document.getElementById("myModal");
const reject = document.getElementById("reject");
const accept = document.getElementById("accept")


setTimeout(() => {
  modal.style.display = "block";
}, 1000);

reject.onclick = function(){
  modal.style.display="none";
}
accept.onclick = function(){
  modal.style.display="none";
}

