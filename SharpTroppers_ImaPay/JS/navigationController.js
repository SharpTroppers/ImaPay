function proceedToAddressStep() {
    event.preventDefault();
    // create JSON file
    window.location.href = "./signupStepTwo.html";
}

function proceedToHomePage() {
    event.preventDefault();
    window.location.href = "../index.html";
}

function finishSignUp() {
    event.preventDefault();
    // create JSON file
    window.location.href = "./succesfullSignup.html";
}

function returnToUserData() {
    event.preventDefault();
    window.location.href = "./signupStepOne.html";
}
function proceedToAccountData() {
    event.preventDefault();
    // create JSON file
    window.location.href = "./signupStepThree.html";
}

function toggleModal() {
    console.log('kk', modal.style.display )
    const modal = document.getElementById("modal-for-terms-of-service");
    if(modal.style.display === "none") return modal.style.display = "flex";
    return modal.style.display = "flex";
}

function agreeToTermsAndService(event) {
    const checkbox = document.getElementById("terms-and-services-checkbox");
    checkbox.checked = true;
    hideModal(event)
}

function showModal(event) {
    const modal = document.getElementById("modal-for-terms-of-service");
    modal.style.display = "flex";
}

function hideModal() {
    const modal = document.getElementById("modal-for-terms-of-service");
    modal.style.display = "none";
}

function toggleSubmitButton(){
    const submitButton = document.getElementById("submit-button");
    const isDisabled = submitButton.disabled;
    
    if(isDisabled) return submitButton.disabled = false;
    submitButton.disabled = true;
}