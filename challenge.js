// Get elements from the document
const usernameTxt = document.getElementById("usernameTxt");
const addressTxt = document.getElementById("addressTxt");
const nameTxt = document.getElementById("nameTxt");
const emailTxt = document.getElementById("emailTxt");
const birthdayTxt = document.getElementById("birthdayTxt");
const promptTxt = document.getElementById("promptTxt");
const loadingImg = document.getElementById("loadingImg");
const generateButton = document.getElementById("generateButton");
const userImg = document.getElementById("userImg");
const userCard = document.getElementById("userCard");

// I wanna write birthdays like this
function birthday(rawDate) {
    const months = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"]

    // It comes in YYYY-MM-DD
    var birthParts = rawDate.split("-");

    return months[parseInt(rawDate[1])] + " " + rawDate[2] + ", " + birthParts[0];
}

// Function to update user data
function updateUserInfo(data) {
    usernameTxt.textContent = "@" + data.username;
    addressTxt.textContent = data.address;
    nameTxt.textContent = data.name;
    emailTxt.textContent = data.email;
    birthdayTxt.textContent = birthday(data.birthday);

    if (data.sex == "F") {
        userImg.src = "./images/userfem.png";
    } else if (data.sex == "M") {
        userImg.src = "./images/usermasc.png";
    }

    // Show the info card
    userCard.style.display = "flex";
}

function showFetchingMessage() {
    promptTxt.textContent = "Fetching user data...";
}

function hideFetchingMessage() {
    promptTxt.textContent = "Generate another random user?";
}

function showErrorMessage() {
    promptTxt.textContent = "The was an error fetching the user data.";
}


// API call function
function apiCall() {

    showFetchingMessage();

    fetch("https://api.api-ninjas.com/v1/randomuser", {
        headers: { 'X-Api-Key': '3AydJTpQtVKPb0/BYMbThw==q1XjoYJU1jAACqrM' }
    })
        // Check network response
        .then(function(response) {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
        }) 

        // On a successful response
        .then(function(data) {
            updateUserInfo(data);
            hideFetchingMessage();
        }) 

        .catch(function(error) {
            console.error("Error fetching user data:", error);
            showErrorMessage();
        })
    
    
}

// Event listeners
generateButton.addEventListener("click", apiCall);