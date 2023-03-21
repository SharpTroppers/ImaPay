const cookiesModal = document.querySelector(".cookies-modal");
const rejectBtn = document.querySelector(".reject-btn");
const acceptBtn = document.querySelector(".accept-btn");
const body = document.querySelector("body");

setTimeout(() => {
  cookiesModal.style.visibility = "visible";
}, 1000);

rejectBtn.onclick = function () {
  cookiesModal.style.display = "none";
};
acceptBtn.onclick = function () {
  cookiesModal.style.display = "none";
};

// rejectBtn.addEventListener("click", () => {
//   cookiesModal.style.display = "none";
// });

// acceptBtn.addEventListener("click", () => {
//   cookiesModal.style.display = "none";
// });
